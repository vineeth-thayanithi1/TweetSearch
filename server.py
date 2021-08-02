#!/usr/bin/env python

import os
from flask import Flask, render_template,request
import json
import urllib.request 

app = Flask(__name__)


@app.route("/search", methods=['POST', 'GET'])
def result():
    if request.method == 'POST':
        a = request.data
        b = a.decode('utf-8')
        c = json.loads(b)
        queryfield = c.get('queryfield')
        # arr =[]
        text=urllib.parse.quote(queryfield)       
        inurl = 'http://ec2-34-205-72-146.compute-1.amazonaws.com:8984/solr/BM25/select?defType=edismax&q='+text+'&stopwords=true&wt=json&indent=true&rows=1000'
        data = urllib.request.urlopen(inurl)
        docs = json.load(data)['response']['docs']
        # for i in docs:
        #     arr.append(i.get('tweet_text'))
        return json.dumps(docs)

@app.route("/")
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run()
