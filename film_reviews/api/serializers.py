from rest_framework import serializers
from film_reviews.models import( 
    Movie, 
    Review, 
    Links,
    GenresChoice,
    FavouriteMovies,
    ReviewFromMovieDB,
    FavouriteMoviesMovieDB,
)
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

""" ----------------------User Serializer--------------------  """
class UserSerializer(serializers.ModelSerializer):
    class Meta:
         model = User
         fields = ('id','email','username',)
        
""" ----------------------String Serializer--------------------  """

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self,value):
        return value  


        
""" ----------------------Movie Serializer--------------------  """
class LinksSerializerformovie(serializers.ModelSerializer):
    
    class Meta:
        model = Links
        fields = ('__all__')
        
class MoviesSerializer(serializers.ModelSerializer):
    links = serializers.SerializerMethodField()
    class Meta:
        model = Movie
        fields = ('id','title','genres','average_rating','links')

    def get_links(self, obj):
        links = LinksSerializerformovie(obj.links.all(), many=True).data
        return links
""" ----------------------Link Serializer--------------------  """

class LinksSerializer(serializers.ModelSerializer):
    movie = MoviesSerializer() #'movie',
    class Meta:
        model = Links
        fields = ( 'movie','imdb_id', 'tmdb_id')

""" ----------------------Review List Serializer for get request set--------------------  """

class ReviewListSerializer(serializers.ModelSerializer):
    movie = MoviesSerializer()
    user_id= UserSerializer()
    class Meta:
        model = Review
        fields = ('movie', 'pub_date', 'user_id',
                  'user_name', 'comment', 'rating')

""" ----------------------Review Serializer for post request view set --------------------  """

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('movie', 'pub_date', 'user_id',
                  'user_name', 'comment', 'rating')

""" ----------------------Genres choices Serializer--------------------  """

class GenresChoicesSerializer(serializers.ModelSerializer):
    #user_id= UserSerializer()
    class Meta:
        model = GenresChoice
        fields = ('user_id','choices')


    def create(self, request):
        data = request.data
        print(data)
        for c in data['choices']:
            genreschoice = GenresChoice()
            user_id = User.objects.get(id=data['user_id'])
            genreschoice.user_id = user_id
            
            genreschoice.choices = c['choices']
            genreschoice.save()   
        return genreschoice

""" ----------------------Favourite movie list Serializer for post request--------------------  """
class FavouriteMoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteMovies
        fields = ('id','user_id','movie','order')

        def create(self, request):
            data = request.data
            print(data)
            
            favouritemovie = FavouriteMovies()
            user_id = User.objects.get(id=data['user_id'])
            favouritemovie.user_id = user_id
                
            favouritemovie.movie = data['movie']
            favouritemovie.order = data['order']
            
            favouritemovie.save()   
            return favouritemovie

""" ----------------------Favourite movie FavouriteMoviesMovieDB list Serializer for post request--------------------  """
class FavouriteMoviesDBSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteMoviesMovieDB
        fields = ('id','user_id','movieid','title')

        def create(self, request):
            data = request.data
            print(data)
            
            favouritemovie = FavouriteMoviesMovieDB()
            user_id = User.objects.get(id=data['user_id'])
            favouritemovie.user_id = user_id
                
            favouritemovie.movieid = data['movieid']
            favouritemovie.title = data['title']
            favouritemovie.save()   
            return favouritemovie

""" ----------------------Favourite movie Serializer for get request--------------------  """

class FavouriteMoviesListSerializer(serializers.ModelSerializer):
    movie = MoviesSerializer()
    user_id= UserSerializer()
    class Meta:
        model = FavouriteMovies
        fields = ('user_id','movie','order')

""" ----------------------Token  Serializer--------------------  """
class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key','user')

""" ---------------------- Review From MovieDB Serializer post request--------------------  """
  
class ReviewFromMovieDBSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewFromMovieDB
        fields = ('movieid', 'title','pub_date', 'user_id',
                  'comment', 'rating')

""" ---------------------- Review From MovieDB Serializer get request--------------------  """

class ReviewFromMovieDBListSerializer(serializers.ModelSerializer):
    user_id= UserSerializer()
    class Meta:
        model = ReviewFromMovieDB
        fields = ('movieid', 'title','pub_date', 'user_id',
                  'comment', 'rating')