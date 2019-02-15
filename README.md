# FetchDataFromAPI
Fetch data from API in React Native
Link youtube: https://www.youtube.com/watch?v=vSSjme0TEwA

API Link: http://hero-api.somee.com/api/heroes

<b>1. STEP 1:</b> Install necessary modules: 'react-navigation', 'react-native-gesture-handler', 'events',
'react-native-vector-icons'<br>
a. npm install --save react-navigation react-native-gesture-handler events react-native-vector-icons<br>
b. react-native link<br>
<b>2. STEP 2:</b> Clone HeroUI (UI to create, update, delete hero) from branch 'master': https://github.com/uit2712/HeroUI<br>
<b>3. STEP 3:</b> Add file 'HTTPMethods.js' to define constant method strings: GET, POST, DELETE, PUT<br>
<b>4. STEP 4:</b> Create controller HeroController<br>
a. Add function 'getHeader(method: string, body={})' to get return header with an input http method and a body if it has (get, post, delete, put)<br>

<pre>
let httpHeader = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
</pre>
b. Add function 'processResponse(response: Response)' to get return object with 2 attributes for next step: responseJson (object), responseStatus (number)<br>
c. Add function 'checkIfResponseValids(responseStatus: number)' to check if we get valid response like: 200<br>
d. Create new Hero<br>
e. Update existing hero<br>
f. Delete existing hero
