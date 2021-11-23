# Add  alias createNodeProject='sh ~/.scripts/templator/startProject.sh' to your .zshr file
ORIGIN_PATH=$(pwd)
cd ~/.scripts/templator
rm -rf server/template/
node server/app.js
echo " * * * * * * * * * * *"
echo " * Project  created! *"
echo " * * * * * * * * * * *"
cp -R server/template $ORIGIN_PATH