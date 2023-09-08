import requests
from bs4 import BeautifulSoup

url = 'https://www.irgups.ru/eis/rasp/index.php?action=student&pid=4379&t=1694182605'
page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')

schedule = []
for row in soup.find_all('tr'):
    schedule.append([cell.text for cell in row.find_all('td')])

print(schedule)
