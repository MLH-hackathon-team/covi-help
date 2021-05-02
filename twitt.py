import twint
#dict_keys(['id', 'id_str', 'conversation_id', 'datetime', 'datestamp', 'timestamp', 'user_id', 'user_id_str', 'username', 'name', 'place', 'timezone', 'mentions', 'reply_to', 'urls', 'photos', 'video', 'thumbnail', 'tweet', 'lang', 'hashtags', 'cashtags', 'replies_count', 'retweets_count', 'likes_count', 'link', 'retweet', 'retweet_id', 'retweet_date', 'user_rt', 'user_rt_id', 'quote_url', 'near', 'geo', 'source', 'translate', 'trans_src', 'trans_dest'])
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('./covi-help-83966-76c7686067f0.json')
firebase_admin.initialize_app(cred)
tweets = []
forbid = ["#Scam", "#SCAM", "#scam", "urgent", "🙏", "help", "#urgent", "#Urgent", "#URGENT", "🙏🏻"]
def load(need, place):
    sc = twint.Config()
    sc.Lang = "en"
    sc.Search = "#" + need + " #" + place
    sc.Limit = 500
    sc.Phone = True
    sc.Since = "2021-5-1"
    #sc.Output = "data.csv"
    #sc.Store_csv = True
    sc.Store_object = True
    sc.Store_object_tweets_list = tweets
    twint.run.Search(sc)
    print("########")
    for i in tweets:
        for j in i.tweet.split():
            if j in forbid:
                tweets.remove(i)
                break
    #Use a service account
    

    db = firestore.client()
    for i in range(len(tweets)):
        doc_ref = db.collection(u'leads').document(str(tweets[i].id))
        doc_ref.set({
            u'text': tweets[i].tweet,
            u'date': tweets[i].datetime,
            u'location': place,
            u'resource': need
            
        })

#load("Oxygen", "Delhi")
#load("Oxygen", "Jaipur")
#load("Oxygen", "Dehradun")
load("Oxygen", "Mumbai")
#load("Bed", "Delhi")
#load("Bed", "Jaipur")
#load("Bed", "Dehradun")
