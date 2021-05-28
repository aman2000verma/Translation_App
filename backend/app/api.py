from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# API URL
URL = "https://translate.google.com/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=%25s&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e&"


# This method fetch result from the Translation API
async def fetchTranslation(text, langDict):
    details = {
        "sl": langDict['source'],
        "tl": langDict['target'],
        "q": text
    }

    res = requests.post(url=URL, data=details, headers={
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
        "AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1"
    }).json()
    return res['sentences'][0]['trans']


@app.get("/")
async def root():
    return {'message': 'You are in root'}


@app.post('/translate')
async def translate(req: dict) -> dict:
    input = req['text']
    print('Translation Request:' , input)
    langs = req['langs']
    print(langs)
    result = await fetchTranslation(input, langs)
    print('Result:', result)
    return {
        "data": {result}
    }
