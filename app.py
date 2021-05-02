from flask import Flask, render_template, jsonify, request, send_from_directory
import requests
import json
from crawling import currently_being_screened, works_to_be_screend

app = Flask(__name__)

def get_movie_list(query):
    url = "https://openapi.naver.com/v1/search/movie.json?"
    clientId = 'mzuHT17o4GQ32KoZ9TVo'
    clientSecret = '5H1F6QeHUg'
    search = 'query=' + query
    header = {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret
    }

    r = requests.get(url + search, headers=header)
    movie_list = json.loads(r.text)

    return movie_list

# currently_being_screened()
# works_to_be_screend()

@app.route('/')
def homework():
    return render_template('index.html')

# @app.route('/favicon.ico') 
# def favicon(): 
#     return send_from_directory(os.path.join(app.root_path), 'favicon.ico', mimetype='image/vnd.microsoft.icon')
    
# @app.route('/movie', methods=['POST'])
# def save_order():
#     query_receive = request.form['query']

#     movie_list = get_movie_list(query_receive)

#     return jsonify({'msg': '주문 완료'})

@app.route('/search', methods=['GET'])
def view_result():
    query_receive = request.args.get('query')

    movie_list = get_movie_list(query_receive)
    
    return jsonify({ 'list': movie_list })

@app.route('/current', methods=['GET'])
def current():
    with open('currently-being-screen.json', 'r', encoding='utf-8') as f:
        cur_screen = json.load(f)
        
    return jsonify({ 'list': cur_screen })


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
