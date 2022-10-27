package com.webserver.webserver.hash;


import java.util.zip.CRC32;

public class CRC32Hash {

    public String getHash(String code) {
        CRC32 crc = new CRC32();

        crc.update(code.getBytes());

        return Long.toHexString(crc.getValue());
    }
}
