import sys
import os
import pandas as pd
import csv
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "film_recsys.settings")
import django
django.setup()
from film_reviews.models import Movie, Links


def save_movie_from_row(movie_row):
    links = Links()
    links.movie = Movie.objects.get(id=movie_row[0])
    links.imdb_id = movie_row[1]
    links.tmdb_id = movie_row[2]
    links.save()


if __name__ == "__main__":

    if len(sys.argv) == 2:
        print("Reading from file ", str(sys.argv[1]))
        moviesdf = pd.read_csv(sys.argv[1], sep=',', encoding='latin-1')
        print(moviesdf)

        moviesdf.apply(
            save_movie_from_row,
            axis=1
        )

        print("There are {} movies".format(Movie.objects.count()))

    else:
        print("Please, provide Movies file path")
