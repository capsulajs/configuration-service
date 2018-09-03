#!/bin/bash
CURRENT_BRANCH_NAME=$TRAVIS_PULL_REQUEST_BRANCH
S3_PATH=s3://$S3_BUCKET
IS_PULL_REQUEST="true"
REPO=$1
S3_PRODUCTION_BUCKET='om2-reactive-widgets-prod'
PREFIX=widgets

SANDBOX_URL="https://om2-reactive-widgets-prod.s3.amazonaws.com/develop/index.html#/v2"


if [[ "$TRAVIS_TAG" ]]; then
    REAL_BRANCH=$(git ls-remote origin | sed -n "\|$TRAVIS_COMMIT\s\+refs/heads/|{s///p}")
    if [ "$REAL_BRANCH" == 'master' ]; then
        CURRENT_BRANCH_NAME=$PREFIX/$TRAVIS_TAG
        echo "PREFIX: $PREFIX" >> build/ansible/roles/widgets-loader/vars/main.yaml
        sed -i 's/d2aennu9wjdilp.cloudfront.net/frontend.marketspulse.com/g' build/ansible/roles/widgets-loader/vars/main.yaml
        S3_PATH=s3://$S3_PRODUCTION_BUCKET
        IS_PULL_REQUEST="false"
        CF_DISTRIBUTION_ID='E266WMDYKXTD02'
    elif [ "$TRAVIS_PULL_REQUEST" == "true" ]; then
	CURRENT_BRANCH_NAME=PR/$REAL_BRANCH
	S3_PATH=s3://$S3_BUCKET
	S3_URL="$SANDBOX_BASE_URL/$CURRENT_BRANCH_NAME"
	IS_PULL_REQUEST="true"
    fi
elif ([ "$TRAVIS_BRANCH" == "develop" ] || [ "$TRAVIS_BRANCH" == "master" ] || [ ! -z "$TRAVIS_TAG" ]) && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    CURRENT_BRANCH_NAME=$TRAVIS_BRANCH
    S3_PATH=s3://$S3_BUCKET
    S3_URL="$SANDBOX_BASE_URL/$CURRENT_BRANCH_NAME"
    IS_PULL_REQUEST="false"
elif [ ! "$TRAVIS_PULL_REQUEST" == "false" ]; then
    CURRENT_BRANCH_NAME=PR/$TRAVIS_PULL_REQUEST_BRANCH
    S3_PATH=s3://$S3_BUCKET
    S3_URL="$SANDBOX_BASE_URL/$CURRENT_BRANCH_NAME"

    IS_PULL_REQUEST="true"
fi;


if [ ! -z "$CURRENT_BRANCH_NAME" ]; then

    echo "current branch: $CURRENT_BRANCH_NAME is pull request: $IS_PULL_REQUEST"
    echo "S3 Path: $S3_PATH"
    echo "travis event type: $TRAVIS_EVENT_TYPE"
    echo "S3_URL url: $S3_URL"

    # generate widgetloader

    if [ "$REAL_BRANCH" == "master" ]; then
    ansible-playbook -e "CURRENT_BRANCH_NAME=$TRAVIS_TAG" -v build/ansible/play.yml --tags "configuration"
    else
    ansible-playbook -e "CURRENT_BRANCH_NAME=$CURRENT_BRANCH_NAME" -v build/ansible/play.yml --tags "configuration"
    fi

    # install aws cli
    pip install --user awscli
    export PATH=$PATH:$HOME/.local/bin

    # count if there is upload to the branch already
    aws s3 ls $S3_PATH/$CURRENT_BRANCH_NAME
    COUNT=$(aws s3 ls $S3_PATH/$CURRENT_BRANCH_NAME| wc -l)
    echo "$COUNT"

    COVERAGE_URL=$S3_URL/coverage/lcov-report/index.html
    CSS_DOCS_URL=$S3_URL/docs/css/index.html
    TYPESCRIPT_DOCS_URL=$S3_URL/docs/typescript/index.html

    # upload to s3
    aws s3 rm $S3_PATH/$CURRENT_BRANCH_NAME --recursive --region $S3_REGION
    aws s3 cp dist $S3_PATH/$CURRENT_BRANCH_NAME --cache-control "max-age=$CACHE_CONTROL_MAX_AGE" --recursive
    aws s3 cp docs $S3_PATH/$CURRENT_BRANCH_NAME/docs --recursive
    aws s3 cp coverage $S3_PATH/$CURRENT_BRANCH_NAME/coverage --recursive
    aws cloudfront create-invalidation --distribution-id $CF_DISTRIBUTION_ID --paths "/$CURRENT_BRANCH_NAME/*"
    if [ "$REAL_BRANCH" == "master" ]; then
        ansible-playbook -e "S3_PATH=$S3_PATH CURRENT_BRANCH_NAME=$PREFIX AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY S3_BUCKET=$S3_PRODUCTION_BUCKET S3_REGION=$S3_REGION" -v build/ansible/play.yml --tags "metadata"
    fi
    echo "sandbox was uploaded to s3 url: $S3_URL"
    echo "coverage report was uploaded to s3 url: $COVERAGE_URL"

    ansible-playbook -e "S3_PATH=$S3_PATH CURRENT_BRANCH_NAME=$CURRENT_BRANCH_NAME AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY S3_BUCKET=$S3_BUCKET S3_REGION=$S3_REGION" -v build/ansible/play.yml --tags "metadata"

    if [ "$IS_PULL_REQUEST" == "true" ] && [ "$COUNT" == "0" ]; then
        # add comment on github pull request.
        sh build/gh.sh $GH_USER $GT_ACCESS_TOKEN $TRAVIS_PULL_REQUEST $SANDBOX_URL $REPO $CURRENT_BRANCH_NAME $COVERAGE_URL $CSS_DOCS_URL $TYPESCRIPT_DOCS_URL
        echo "comment sent to GH pull request: $CURRENT_BRANCH_NAME PR $TRAVIS_PULL_REQUEST"
    else
        echo "comment was skipped not a pull request or comment already created."
    fi

else
    echo "CURRENT_BRANCH_NAME is empty this is not a pull request or develop branch. skipping deployment"
fi
