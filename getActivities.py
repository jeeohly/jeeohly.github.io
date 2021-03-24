import sys
import json
import requests
import calendar
from datetime import datetime

monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

def getAuthToken():
    stravaAuthData = {
        'client_id': '62731',
        'client_secret': '28cb68c1ccaad45d8ebcc2ac06cbb1787c8b75cf',
        'grant_type': 'refresh_token',
        'refresh_token': '19c23b442cb30f483b101b657524afc8e28bcce3'
    }
    stravaAuthResponse = requests.post('https://www.strava.com/api/v3/oauth/token', data=stravaAuthData)
    return stravaAuthResponse

def epochConverter(year, month, day):
    timeDelta = datetime(year, month, day) - datetime(1970, 1, 1)
    epochTime = int(timeDelta.total_seconds())
    return epochTime

def getBefore(year, month):
    before_month = 0
    before_year = 0

    if month == 12:
        before_month = 1
        before_year = year + 1
    else:
        before_month = month + 1
        before_year = year 

    before = epochConverter(before_year, before_month, 1)
    return before

def getAfter(year, month):
    after_month = 0
    after_year = 0
    if month == 1:
        after_month = 12 
        after_year = year - 1
    else: 
        after_month = month - 1
        after_year = year
    after_day = calendar.monthrange(after_year, after_month)[1]
    after = epochConverter(after_year, after_month, after_day)
    return after 

def getActivities(authToken, year, month):
    before = str(getBefore(year, month))
    after = str(getAfter(year, month))
    numActivities = str(calendar.monthrange(year, month)[1])

    stravaActivitiesHeaders = {"Authorization": "Bearer " + authToken}
    stravaActivitiesResponse = requests.get('https://www.strava.com/api/v3/athlete/activities?before='+before+'&after='+after+'page=1&per_page='+numActivities, headers=stravaActivitiesHeaders)
    stravaActivitiesJson = json.loads((stravaActivitiesResponse.content).decode('utf-8'))
    with open("stravaActivities/"+str(year)+"/"+str(month)+".json", 'w') as outfile:
        json.dump(stravaActivitiesJson, outfile)

if len(sys.argv) == 3:
    year = int(sys.argv[1])
    month = int(sys.argv[2])
    stravaAuthTokenObject = getAuthToken()
    stravaAuthTokenJson = json.loads((stravaAuthTokenObject.content).decode('utf-8'))
    stravaAuthToken = stravaAuthTokenJson["access_token"]
    getActivities(stravaAuthToken, year, month)

else:
    print("call python3 getActivities.py [year] [month number]")


