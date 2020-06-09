## [Under Development]
Orderly keeps your desktop and folders organized at all time and in realtime 

## if you are on linux
you must install mono tool because electron-rebuild will use it to rebuild sqlite3
refer to this link 
https://linuxize.com/post/how-to-install-mono-on-ubuntu-18-04/

Or execute those commands in order 
sudo apt update
sudo apt install dirmngr gnupg apt-transport-https ca-certificates
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
sudo sh -c 'echo "deb https://download.mono-project.com/repo/ubuntu stable-bionic main" > /etc/apt/sources.list.d/mono-official-stable.list'
sudo apt update
sudo apt install mono-complete
sudo npm install
sudo npm run rebuild
