from officialapi . models import branch
import requests
from requests.auth import HTTPBasicAuth

def sendsms(branchNumber,branchName,serviceRequestId,phone):
    serviceNumber ='COSMO0'+serviceRequestId
    variable_one=str(branchName)+"-"+str(branchNumber)+"-"
    response = requests.get("https://msg.mtalkz.com/V2/http-api.php?apikey=WXMW9R3sqJgBOJRd&senderid=COSMSR&number="+str(phone)+"&message=Your service request has been processed. please contact our "+variable_one+" branch for more details. Your acknowledgement no is ."+serviceNumber+"/ COSMOS&format=json")
    print(response.status_code)