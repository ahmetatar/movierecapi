@echo off
set projdir=%cd%
set osdir=%SystemDrive%
set "vboxdir=%osdir%\program files\oracle\virtualbox\VBoxManage.exe"
set machine=%1

if "%machine%"=="" (
    echo "Please provide docker machine name!"
) else (
    "%vboxdir%" sharedfolder add %machine% -name usr/app -hostpath \\?\%projdir%
    "%vboxdir%" setextradata %machine% VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root 1
    "%vboxdir%" setextradata %machine% VBoxInternal2/SharedFoldersEnableSymlinksCreate/usr/app 1

    docker-machine start %machine%
    (
        echo sudo mkdir /usr/app -p
        echo sudo mount -t vboxsf usr/app /usr/app/
    ) | docker-machine ssh %machine%

    exit
)