echo `git rev-parse HEAD` > version.html

mkdir build
cp index.html build/
cp version.html build/
cp -r assets build/
cp -r lib build/
cp -r src build/

cd build
s3cmd sync --acl-public --guess-mime-type --recursive . s3://writing-linter/
cd ..
rm -rf build