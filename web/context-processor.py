from officialapi . models import branch

def main_context(request):
    medias = branch.objects.all()
    return {
        'domain' : request.META['HTTP_HOST'],
        'medias'  : medias,
    }