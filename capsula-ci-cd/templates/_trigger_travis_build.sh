#!/bin/bash
org=$1
repo=$2
branch=$3

function trigger_travis_build() {
     local org=$1 && shift
     local repo=$1 && shift
     local branch=${1:-master} && shift

     body="{
             \"request\": {
               \"branch\": \"${branch}\"
              }
           }"

     curl -s -X POST \
          -H "Content-Type: application/json" \
          -H "Accept: application/json" \
          -H "Travis-API-Version: 3" \
          -H "Authorization: token $TRAVIS_ACCESS_TOKEN" \
          -d "$body" \
          "https://api.travis-ci.com/repo/${org}%2F${repo}/requests"
 }

if ([ "$TRAVIS_BRANCH" == "develop" ] || [ ! -z "$TRAVIS_TAG" ]) &&   [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    echo "Triggering travis remote build $1/$2 branch $3"
    trigger_travis_build $org \
			         $repo \
			         $branch
else
    echo "skipping travis trigger build as current branch is not develop branch"
fi;
