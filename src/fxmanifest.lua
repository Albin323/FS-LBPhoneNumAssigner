fx_version 'cerulean'
game 'gta5'

author 'FearlessStudios'
description 'FS-LBPhoneNumAssigner by FearlessStudios'
version '1.0.1'

server_script 'dist/server/**/*.js'

files {
    'config.json'
}

dependencies {
    'FS-Lib',
    'lb-phone',
    'oxmysql'
}
