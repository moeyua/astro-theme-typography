# Check if the template repository is already added

git remote | grep template > /dev/null

# If not, add the template repository

if [ $? -ne 0 ]; then
  git remote add template https://github.com/moeyua/astro-theme-typography.git
fi

# Fetch the latest changes from the template repository

git fetch template

# Merge the latest changes from the template repository into the current branch
git merge template/main --allow-unrelated-histories
