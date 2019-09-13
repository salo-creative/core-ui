
echo "\033[1m\033[34m============================================"
echo "=========== Switching to master ============"
echo $"============================================\033[39m"

git stash
git checkout master
git pull origin master

echo $"\n\n\033[34m============================================"
echo "==== Check local and origin are in sync ===="
echo $"============================================\033[39m"
if [ "$(git rev-parse master)" = "$(git rev-parse origin/master)" ]
then
  echo $"Branches in sync\nMoving on to the deployment"
else
  echo $"\033[31mBranches not in sync.\nPlease make sure your changes are pushed to master before deploying"
  exit 1
fi

echo $"\n\n\033[32m============================================"
echo "============== Run deployment =============="
echo $"============================================\033[39m"
now -A now.production.json --target production