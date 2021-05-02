import requests
import json
from bs4 import BeautifulSoup

def currently_being_screened():
    url = 'https://movie.naver.com/movie/running/current.nhn'

    headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url,headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    movie_info = soup.select('#content > div.article > div:nth-child(1) > div.lst_wrap > ul > li')

    cur_screen = {
        'list': []
    }

    for info in movie_info:
        movie = {}

        title = info.select_one('dl > dt > a')
        image = info.select_one('div > a > img')
        viewing_age = info.select_one('dl > dt > span')
        grade = info.select_one('dl > dd.star > dl.info_star > dd > div > a > span.num')
        rate = info.select_one('dl > dd.star > dl.info_exp > dd > div > span.num')
        opening_date = info.select_one('dl > dd:nth-child(3) > dl > dd:nth-child(2)')

        if title: movie['title'] = title.text
        if image: movie['image'] = image['src'].split('?')[0]
        if viewing_age: movie['viewingAge'] = viewing_age.text
        if grade: movie['grade'] = grade.text
        if rate: movie['rate'] = rate.text
        if opening_date: movie['openingDate'] = opening_date.text.split()[-2]

        cur_screen['list'].append(movie)

    with open('currently-being-screen.json', 'w', encoding='utf-8') as f:
        json.dump(cur_screen, f, ensure_ascii=False, indent='\t')

def works_to_be_screend():
    url = 'https://movie.naver.com/movie/running/premovie.nhn'

    headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url,headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    works_screen = {
        'list': []
    }

    movies = soup.select('#content > div.article > div:nth-child(1) > div.lst_wrap')

    for movie in movies:
        movie_info = movie.select_one('ul').select('li')

        for info in movie_info:
            movie = {}

            title = info.select_one('dl > dt > a')
            image = info.select_one('div > a > img')
            viewing_age = info.select_one('dl > dt > span')
            grade = info.select_one('dl > dd.star > dl > dd:nth-child(2) > div > a > span.num')
            opening_date = info.select_one('dl > dd:nth-child(3) > dl > dd:nth-child(2)')

            if title: movie['title'] = title.text
            if image: movie['image'] = image['src'].split('?')[0]
            if viewing_age: movie['viewingAge'] = viewing_age.text
            if grade: movie['grade'] = grade.text
            if opening_date: movie['openingDate'] = opening_date.text.split()[-2]

            works_screen['list'].append(movie)

    with open('works-to-be-screend.json', 'w', encoding='utf-8') as f:
        json.dump(works_screen, f, ensure_ascii=False, indent='\t')
