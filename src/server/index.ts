import { config } from '@/util/config'
import { oxmysql } from '@overextended/oxmysql';

on('playerConnecting', async (name: string, _setKickReason: any, deferrals: any) => {
    deferrals.defer()

    const src = source;

    const numberMatch = name.match(/^\d+/);
    if (!numberMatch) {
        deferrals.done("Your name must start with a number.");
        return;
    }

    const number = numberMatch[0];
    const paddedNumber = number.padStart(4, '0');
    const license = GetPlayerIdentifierByType(src.toString(), 'license');

    if (!license) {
        console.error(`^1[ERROR]^0 No license found for source: ${src}`);
        deferrals.done("Failed to fetch your license. Please rejoin.");
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
        console.error(`^1[ERROR]^0 Database error: ${error.message}`);
        deferrals.done("Failed to register your phone number. Please contact support.");
    }
})

exports['FS-Lib'].VersionCheck('FS-LBPhoneNumAssigner', 'fearlessnite345/FS-LBPhoneNumAssigner')