import { config } from '@/util/config'
import { oxmysql } from '@overextended/oxmysql';
import { locale } from 'locales';

on('playerConnecting', async (name: string, _setKickReason: any, deferrals: any) => {
    deferrals.defer()

    const src = source;

    const numberMatch = name.match(/^\d+/);
    if (!numberMatch) {
        deferrals.done(locale('name_must_start_with_number'));
        return;
    }

    const number = numberMatch[0];
    const paddedNumber = number.padStart(4, '0');
    const license = GetPlayerIdentifierByType(src.toString(), 'license');

    if (!license) {
        console.error(locale('error_no_license').replace('{src}', src.toString()));
        deferrals.done(locale('failed_to_fetch_license'));
        return;
    }

    // Use the format from the config to create the phone number
    const phoneNumber = config.lbphoneNumberFormat.replace("{number}", paddedNumber);

    try {
        await oxmysql.insert('INSERT IGNORE INTO phone_phones (id, owner_id, phone_number) VALUES (?, ?, ?)', [
            license, license, phoneNumber
        ]);
        deferrals.done();
    } catch (error) {
        console.error(locale('error_database').replace('{error}', error.message));
        deferrals.done(locale('failed_to_register_phone_number'));
    }
})

exports['FS-Lib'].VersionCheck('FS-LBPhoneNumAssigner', 'fearlessnite345/FS-LBPhoneNumAssigner')