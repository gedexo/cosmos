import re
from django.http.response import HttpResponse
from django.shortcuts import render
from django.contrib.auth import get_user_model
from  officialapi. models import cycle,badminton,fitness,branch,service_request
from web.models import AboutBranch

def log_in(request):
    return render(request, 'official/signin.html')

def Dashboard(request):
    return render(request,'official/dashboard.html')

def Branch(request):
    return render(request,'official/branches.html')

def User(request,pk):
    userDetails = get_user_model().objects.filter(branch_id = pk)
    return render(request, 'official/add-user.html',{'user':userDetails,'pk':pk})
    
def service_requests(request):
    return render(request,'official/service-requests.html')

def logs(request):
    return render(request,'official/logs.html')

def admin_user(request):
    userDetails = get_user_model().objects.filter(is_superuser = True)
    return render(request,'official/admin-user.html',{'user':userDetails})

def job_card(request,pk):
    category =''
    fitnessJobCardId = ''
    cycleJobCardId = ''
    badmintonJobCardId = ''
    branchs = branch.objects.all()
    try:
        category = service_request.objects.get(id= pk).category
        if category == 'fitness':
            fitnessJobCardId = fitness.objects.filter(service_request_id = pk).exists()
            if fitnessJobCardId == True:
                fitnessJobCardId = fitness.objects.get(service_request_id = pk).id
            else:
                fitnessJobCardId = 0
        elif category == 'cycle':
            cycleJobCardId = cycle.objects.filter(service_request_id = pk).exists()
            if cycleJobCardId == True:
                cycleJobCardId = cycle.objects.get(service_request_id = pk).id
            else:
                cycleJobCardId = 0

        else:
            badmintonJobCardId = badminton.objects.filter(service_request_id = pk).exists()
            if badmintonJobCardId == True:
                badmintonJobCardId = badminton.objects.get(service_request_id = pk).id
            else:
                badmintonJobCardId = 0

    except:
        pass
    
    return render(request,'official/job-card.html',{'category':category,'pk':pk,'fitnesesJobCardId':fitnessJobCardId,'cycleJobCardId':cycleJobCardId,'badmintonJobCardId':badmintonJobCardId,'branch':branchs})

def filter_reports(request):
    branches = branch.objects.all()
    return render(request, 'official/reports.html',{'branch':branches})

def products(request):
    return render(request,'official/add-products.html')

def slider(request):
    return render(request,'official/slider.html')

def blog(request):
    return render(request,'official/blog.html')

def banner(request):
    return render(request,'official/banner.html')

def brand(request):
    return render(request,'official/brands.html')

def ads(request):
    return render(request,'official/ads.html')

def printForm(request,serviceRequest):
    jobCardId = ''
    
    try:
        category = service_request.objects.get(id= serviceRequest).category
        if category == 'fitness':
            fitnessJobCardId = fitness.objects.filter(service_request_id = serviceRequest).exists()
            if fitnessJobCardId == True:
                jobCardId = fitness.objects.get(service_request_id = serviceRequest).id
            else:
                jobCardId = 0
        elif category == 'cycle':
            cycleJobCardId = cycle.objects.filter(service_request_id = serviceRequest).exists()
            if cycleJobCardId == True:
                jobCardId = cycle.objects.get(service_request_id = serviceRequest).id
            else:
                jobCardId = 0

        else:
            badmintonJobCardId = badminton.objects.filter(service_request_id = serviceRequest).exists()
            if badmintonJobCardId == True:
                jobCardId = badminton.objects.get(service_request_id = serviceRequest).id
            else:
                jobCardId = 0

    except:
        pass
    return render(request,'official/print.html',{'job_card':jobCardId})


def about_branch(request):
    branches = AboutBranch.objects.all()

    context = {
        "branches" : branches,

    }
    return render(request,'official/about-branch.html',context)