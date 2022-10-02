package com.webserver.hash;


import java.util.zip.CRC32;

public class CRC32Hash {

    public static String getHash(String code){

        CRC32 crc = new CRC32();
        crc.update(code.getBytes());

        return Long.toHexString(crc.getValue());
    }

}
