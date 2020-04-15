from selenium import webdriver

wd = webdriver.Firefox() # choose the browser for selenium to boot up
wd.get("http://localhost:3000/") # choose the url to navigate to

def read_local_storage():
    # javascript script to execute. the frontend will store the user's ID
    # to local storage on login, and the backend will read it each time
    # an endpoint is hit. it will use this ID along with other attributes in
    # the network request to query the database. the user's ID will remain in
    # their local storage until they log out and it is removed. this is how we
    # created a mock session
    return wd.execute_script("return localStorage.getItem('user_id')")