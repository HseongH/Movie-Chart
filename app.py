from flask import Flask, render_template, jsonify, request
import requests
import json

app = Flask(__name__)

def get_movie_list(query):
    url = "https://openapi.naver.com/v1/search/movie.json?"
    clientId = 'mzuHT17o4GQ32KoZ9TVo'
    clientSecret = '5H1F6QeHUg'
    query = 'query=' + query
    header = {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret
    }

    r = requests.get(url + query, headers=header)
    movie_list = json.loads(r.text)

    return movie_list

@app.route('/')
def homework():
    return render_template('index.html')
    
# @app.route('/movie', methods=['POST'])
# def save_order():
#     query_receive = request.form['query']

#     movie_list = get_movie_list(query_receive)

#     return jsonify({'msg': '주문 완료'})

@app.route('/search', methods=['GET'])
def view_result():
    # query_receive = request.form['query']

    movie_list = get_movie_list('비와 당신의 이야기')

    return jsonify({ 'list': movie_list['items'] })


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
