#!/usr/bin/env bash

#  - $TRAVIS_BRANCH == "develop" && npm version $(node -e "let v = `npm version`;console.log(v['@markets-pulse/mp-widgets']);")-`date +%s`
VERSION_PREFIX="v"
VERSION=$(node -e "let v = `npm version`;console.log(v[Object.keys(v)[0]]);")
echo "starting working on release: $VERSION"
PREFIX="release/"
BRANCH=$PREFIX$VERSION
DEVELOP_BRANCH="develop"
BASE=$(git branch --no-color | grep '^\* ' | grep -v 'no branch' | sed 's/^* //g')
ORIGIN="origin"
MASTER_BRANCH="master"

# shell output
warn() { echo "$@" >&2; }
die() { warn "$@"; exit 1; }
escape() {
	echo "$1" | sed 's/\([\.\$\*]\)/\\\1/g'
}
# set logic
has() {
	local item=$1; shift
	echo " $@ " | grep -q " $(escape $item) "
}

git_current_branch() {
	git branch --no-color | grep '^\* ' | grep -v 'no branch' | sed 's/^* //g'
}

git_is_clean_working_tree() {
	if ! git diff --no-ext-diff --ignore-submodules --quiet --exit-code; then
		return 1
	elif ! git diff-index --cached --quiet --ignore-submodules HEAD --; then
		return 2
	else
		return 0
	fi
}
git_local_branches() { git branch --no-color | sed 's/^[* ] //'; }
git_remote_branches() { git branch -r --no-color | sed 's/^[* ] //'; }
git_all_branches() { ( git branch --no-color; git branch -r --no-color) | sed 's/^[* ] //'; }
git_all_tags() { git tag; }


git_do() {
  # equivalent to git, used to indicate actions that make modifications
  #if flag show_commands; then
  #  echo "git $@" >&2
  #fi
  git "$@"
}



require_base_is_on_develop() {
	if ! git_do branch --no-color --contains "$BASE" 2>/dev/null \
			| sed 's/[* ] //g' \
	  		| grep -q "^$DEVELOP_BRANCH\$"; then
		die "fatal: Given base '$BASE' is not a valid commit on '$DEVELOP_BRANCH'."
	fi
}
require_no_existing_release_branches() {
	local release_branches=$(echo "$(git_all_branches)" | grep "$PREFIX")
	local first_branch=$(echo ${release_branches} | head -n1)
	echo $first_branch
	first_branch=${first_branch#$PREFIX}
	[ -z "$release_branches" ] || \
		die "There is an existing release branch ($first_branch). Finish that one first."
}
require_version_arg() {
	if [ "$VERSION" = "" ]; then
		warn "Missing argument <version>"
		usage
		exit 1
	fi
}
require_branch() {
	if ! has $1 $(git_all_branches); then
		die "Branch '$1' does not exist and is required."
	fi
}

require_branch_absent() {
	if has $1 $(git_all_branches); then
		die "Branch '$1' already exists. Pick another name."
	fi
}

require_tag_absent() {
	for tag in $(git_all_tags); do
		if [ "$1" = "$tag" ]; then
			die "Tag '$1' already exists. Pick another name."
		fi
	done
}

require_clean_working_tree() {
	git_is_clean_working_tree
	local result=$?
	if [ $result -eq 1 ]; then
		die "fatal: Working tree contains unstaged changes. Aborting."
	fi
	if [ $result -eq 2 ]; then
		die "fatal: Index contains uncommited changes. Aborting."
	fi
}
git_local_branch_exists() {
	has $1 $(git_local_branches)
}
require_local_branch() {
	if ! git_local_branch_exists $1; then
		die "fatal: Local branch '$1' does not exist and is required."
	fi
}

require_remote_branch() {
	if ! has $1 $(git_remote_branches); then
		die "Remote branch '$1' does not exist and is required."
	fi
}
#
# git_compare_branches()
#
# Tests whether branches and their "origin" counterparts have diverged and need
# merging first. It returns error codes to provide more detail, like so:
#
# 0    Branch heads point to the same commit
# 1    First given branch needs fast-forwarding
# 2    Second given branch needs fast-forwarding
# 3    Branch needs a real merge
# 4    There is no merge base, i.e. the branches have no common ancestors
#
git_compare_branches() {
	local commit1=$(git rev-parse "$1")
	local commit2=$(git rev-parse "$2")
	if [ "$commit1" != "$commit2" ]; then
		local base=$(git merge-base "$commit1" "$commit2")
		if [ $? -ne 0 ]; then
			return 4
		elif [ "$commit1" = "$base" ]; then
			return 1
		elif [ "$commit2" = "$base" ]; then
			return 2
		else
			return 3
		fi
	else
		return 0
	fi
}
require_branches_equal() {
	require_local_branch "$1"
	require_remote_branch "$2"
	git_compare_branches "$1" "$2"
	local status=$?
	if [ $status -gt 0 ]; then
		warn "Branches '$1' and '$2' have diverged."
		if [ $status -eq 1 ]; then
			die "And branch '$1' may be fast-forwarded."
		elif [ $status -eq 2 ]; then
			# Warn here, since there is no harm in being ahead
			warn "And local branch '$1' is ahead of '$2'."
		else
			die "Branches need merging first."
		fi
	fi
}
#
# git_is_branch_merged_into()
#
# Checks whether branch $1 is succesfully merged into $2
#
git_is_branch_merged_into() {
	local subject=$1
	local base=$2
	local all_merges="$(git branch --no-color --contains $subject | sed 's/^[* ] //')"
	has $base $all_merges
}

git_tag_exists() {
	has $1 $(git_all_tags)
}

cmd_start() {
	require_version_arg
	require_base_is_on_develop
	require_no_existing_release_branches
	# sanity checks
	require_clean_working_tree
	git_do fetch -q "$ORIGIN"
	require_branch_absent "$BRANCH"
	require_branch_absent "$ORIGIN/$BRANCH"
	require_tag_absent "$VERSION_PREFIX$VERSION"

	if has "$ORIGIN/$DEVELOP_BRANCH" $(git_remote_branches); then
		require_branches_equal "$DEVELOP_BRANCH" "$ORIGIN/$DEVELOP_BRANCH"
	fi

	# create branch
	git_do checkout -b "$BRANCH" "$BASE"


	# create remote branch
	git_do push "$ORIGIN" "$BRANCH:refs/heads/$BRANCH"
	git_do fetch -q "$ORIGIN"

	# configure remote tracking
	git_do config "branch.$BRANCH.remote" "$ORIGIN"
	git_do config "branch.$BRANCH.merge" "refs/heads/$BRANCH"
	git_do checkout "$BRANCH"


	echo
	echo "Summary of actions:"
	echo "- A new branch '$BRANCH' was created, based on '$BASE'"
	echo "- A new remote branch '$BRANCH' was created"
	echo "- The local branch '$BRANCH' was configured to track the remote branch"
	echo "- You are now on branch '$BRANCH'"
	echo
	echo "Follow-up actions:"
	echo "- Verify your version, QA, sanity, automation..."
	echo "- When done, run:"
	echo
	echo "     release finish"
	echo
}

# finish
#merge to master
#tag $TAG

#npm version patch
#git commit
#git merge development

#delete branch

cmd_finish() {
    # sanity checks
    require_version_arg
	require_branch "$BRANCH"
	require_clean_working_tree

    git_do fetch -q "$ORIGIN" "$MASTER_BRANCH" || \
      die "Could not fetch $MASTER_BRANCH from $ORIGIN."
    git_do fetch -q "$ORIGIN" "$DEVELOP_BRANCH" || \
      die "Could not fetch $DEVELOP_BRANCH from $ORIGIN."

    git_do checkout $MASTER_BRANCH

	if has "$ORIGIN/$MASTER_BRANCH" $(git_remote_branches); then
		require_branches_equal "$MASTER_BRANCH" "$ORIGIN/$MASTER_BRANCH"
	fi
	if has "$ORIGIN/$DEVELOP_BRANCH" $(git_remote_branches); then
		require_branches_equal "$DEVELOP_BRANCH" "$ORIGIN/$DEVELOP_BRANCH"
	fi

	# try to merge into master
	# in case a previous attempt to finish this release branch has failed,
	# but the merge into master was successful, we skip it now
	#if ! git_is_branch_merged_into "$BRANCH" "$MASTER_BRANCH"; then
	    echo "merging into master..."
		git_do checkout "$MASTER_BRANCH" || \
		  die "Could not check out $MASTER_BRANCH."
        git_do merge --no-ff "$BRANCH" -m "release version $VERSION" || \
            git_do checkout --thiers npm-shrinkwrap.json && git_do add npm-shrinkwrap.json
            # TODO: What do we do now?
        git_do commit -m "merge shrinkwrap"
    #fi

    # try to tag the release
    # in case a previous attempt to finish this release branch has failed,
    # but the tag was set successful, we skip it now
    local tagname=$VERSION_PREFIX$VERSION
    FLAGS_message="Version tag: $VERSION_PREFIX$VERSION"
    if ! git_tag_exists "$tagname"; then
        local opts="-a"
        [ "$FLAGS_message" != "" ] && opts="$opts -m '$FLAGS_message'"
        eval git_do tag $opts "$tagname" "$BRANCH" || \
        die "Tagging failed. Please run finish again to retry."
    fi

	# try to merge into develop
	# in case a previous attempt to finish this release branch has failed,
	# but the merge into develop was successful, we skip it now
	if ! git_is_branch_merged_into "$BRANCH" "$DEVELOP_BRANCH"; then
		git_do checkout "$DEVELOP_BRANCH" || \
		  die "Could not check out $DEVELOP_BRANCH."
		# TODO: Actually, accounting for 'git describe' pays, so we should
		# ideally git merge --no-ff $tagname here, instead!
        git_do merge --no-ff "$BRANCH" -m "merge from release" || \
            git_do checkout --theirs npm-shrinkwrap.json && git_do add npm-shrinkwrap.json && git_do commit -m "merge shrinkwrap"
            # TODO: What do we do now?
	fi

	# bump version on dev
	git_do checkout $DEVELOP_BRANCH
    npm version patch --no-git-tag-version
    git add npm-shrinkwrap.json package.json
	git_do commit -m "bumb version"

	# delete branch
    if [ "$BRANCH" = "$(git_current_branch)" ]; then
        git_do checkout "$MASTER_BRANCH"
    fi
    git_do branch -d "$BRANCH"

    echo "pushing develop: $DEVELOP_BRANCH";
    git_do push "$ORIGIN" "$DEVELOP_BRANCH" || \
        die "Could not push to $DEVELOP_BRANCH from $ORIGIN."
    echo "pushing master: $MASTER_BRANCH";
    git_do push "$ORIGIN" "$MASTER_BRANCH" || \
        die "Could not push to $MASTER_BRANCH from $ORIGIN."
    echo "pushing origin $ORIGIN";
    git_do push --tags "$ORIGIN" || \
      die "Could not push tags to $ORIGIN."

    git_do push "$ORIGIN" :"$BRANCH" || \
        die "Could not delete the remote $BRANCH in $ORIGIN."

	echo
	echo "Summary of actions:"
	echo "- Latest objects have been fetched from '$ORIGIN'"
	echo "- Release branch has been merged into '$MASTER_BRANCH'"
	echo "- The release was tagged '$tagname'"
	echo "- Release branch has been back-merged into '$DEVELOP_BRANCH'"
	echo "- Release branch '$BRANCH' has been deleted"
	echo "- '$DEVELOP_BRANCH', '$MASTER_BRANCH' and tags have been pushed to '$ORIGIN'"
	echo "- Release branch '$BRANCH' in '$ORIGIN' has been deleted."
}

usage() {
	echo "usage: release <start/finish>"
}

main() {
	if [ $# -lt 1 ]; then
		usage
		exit 1
	fi

	# sanity checks
	SUBCOMMAND="$1";

	# run the specified action
    if [ $SUBCOMMAND != "start" ] && [ $SUBCOMMAND != "finish" ] ; then
        usage
        exit 1
    fi

    cmd_$SUBCOMMAND "$@"
}

main "$@"