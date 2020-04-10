from selenium import webdriver

wd = webdriver.Firefox()
wd.get("http://localhost:3000/")

def read_local_storage():
    return wd.execute_script("return localStorage.getItem('user_id')")