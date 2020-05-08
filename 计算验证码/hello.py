# coding=utf-8
import base64
import hashlib
import hmac
import struct
import time
import web
import json


# 参数secretKey是开通google身份验证时的密钥
def cal_google_code(secretKey):
    inputKey = int(time.time()) // 30
    key = base64.b32decode(secretKey)
    msg = struct.pack(">Q", inputKey)
    googleCode = hmac.new(key, msg, hashlib.sha1).digest()
    o = googleCode[19] & 15
    googleCode = str((struct.unpack(">I", googleCode[o:o + 4])[0] & 0x7fffffff) % 1000000)
    if len(googleCode) == 5:  # 若是5位码，第一位补上0
        googleCode = '0' + googleCode
    else:
        googleCode = googleCode
    return googleCode


# print(cal_google_code('I6KGVUQY4JVROOQ5'))

urls = (
    "/", "Hello",
    "/code", "Code",
)


# app = web.application(urls, globals())


class Hello:
    def GET(self):
        return '欢迎使用谷歌验证码小工具，记得给点个star哦'


class Code:
    def POST(self):
        data = web.input()
        # code = data.code
        print(data)
        all_key = data.code.split(',')
        all_code = []
        for key in all_key:
            all_code.append(cal_google_code(key))
        return json.dumps(all_code)

    def OPTIONS(self):
        pass


def customhook():
    web.header('Access-Control-Allow-Origin', '*')
    web.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin, '
                                               'Access-Control-Allow-Headers, X-Requested-By, '
                                               'Access-Control-Allow-Methods')
    web.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')


if __name__ == "__main__":
    app = web.application(urls, globals())
    app.add_processor(web.loadhook(customhook))
    app.run()
