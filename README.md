# Voice Controlled Dashboard

This repo demonstrates the power of combining IFTTT Maker Webhooks, Google Assistant, Firebase real-time database, Firebase Cloud Functions, Vue.js, and Node.js to swap out or manipulate components on a dashboard using your voice. It contains code for the Vue.js frontend, Node.js backend, and Firebase Cloud Functions. For the weather portion, of the dashboard, we will make use of the Dark Sky API. It was designed for large desktop views, so please forgive me if it looks very bad on mobile as I did not make it responsive. The global `font-size` can be changed in the `body` of the CSS in `App.vue` in order to make it look better in smaller desktop views. I hope to make a mobile-friendly version eventually! Alright, let's get started!

# Firebase Setup
Clone this project to your local machine. In the root directory, run `npm install` or `npm i` (shorthand). Then, navigate to the `functions` directory, and again run `npm install`.

## Firebase Project Setup

Go to https://console.firebase.google.com to enter the firebase console. Select `Add project`. A modal will open up for you to enter the name of your new project. Choose any name you like. Maybe something like `dashboard` or `home-dashboard`. If the project name is already taken, Google will append a number at the end for you. This name is important. You will use this project name to replace placeholders I have set in certain files of this project. These files include: `.firebaserc` and `firebase/init.js`.

Accept the terms of conditions and hit the button that says `Create project`. Once your project is created, navigate to the project. You will see a dashboard-like area open up in the firebase console. On the left-nav, click on where it says `Database`. It will ask you if you want to use the real-time database or Firestore. For this project, I went with the real-time database. After selecting the real-time database, you will be taken to an area that has the data in your firebase database, which will be empty. Hit the button with the vertical line of three dots and select `Import JSON`. In this repo, you will find a file named `initialData.json`. Select this file when you are prompted by the Firebase console, and you will see data get added to your firebase database.

Let's go back to the project you cloned now. I mentioned that you would need to use your project name in the files, `.firebaserc` and `firebase/init.js`. Go to `.firebaserc` and replace `[FIREBASE_PROJECT_NAME]` with the project name.

Similarly, go to `.firebase/init.js` and replace every occurence of `[FIREBASE_PROJECT_NAME]` with the name of your project. If your project name is something like `dashboard-12345`, then your config object should look like this: 
```javascript
const config = {
  apiKey: '[FIREBASE_API_KEY]',
  authDomain: 'dashboard-12345.firebaseapp.com',
  databaseURL: 'https://dashboard-12345.firebaseio.com',
  storageBucket: 'gs://dashboard-12345.appspot.com'
};
```
Notice, however, that we are still missing the Firebase API Key. You can obtain this by going back to the Firebase console and inside your project. On the top of the left nav, you will see `Project Overview`. Click on the gear next to this and select `Project settings`. You will be taken to a page where the API key is listed as `Web API Key` followed by a weird combination of letters, numbers, and other characters. Take this Web API Key and replace `[FIREBASE_API_KEY]` in the file, `firebase/init.js`, with it.

## Firebase Cloud Function Setup
Run `npm install -g firebase-tools` to install the firebase CLI tools globally on your machine. Make sure you're in the root directory of this project and run `firebase login`. This will prompt you to login to your Google account associated with the Firebase project you created earlier. When you are ready to deploy the Firebase Cloud Functions, then run `firebase deploy --only functions`.

# Dark Sky API Setup
Sign up for the Dark Sky developer account at https://darksky.net/dev/register. Then, go to your account at https://darksky.net/dev/account. On this page, you will see a place to get the Secret Key. This is the API Key that you need. Once you have it, go to `server/server.js` and you will see this line:

```javascript
const darkSkyURL = 'https://api.darksky.net/forecast/[DARKSKY_API_KEY]/42.3601,-71.0589?exclude=[minutely,hourly,flags]';
```

Replace `[DARKSKY_API_KEY]` with the value of your Dark Sky API Key.

# IFTTT Setup
Go to https://ifttt.com/ and create a new account if you don't already have one. You can login with Google or Facebook if that is faster. Once you create an account, we can begin creating our Applets. We will be making a total of four. This can be done by clicking on your username on the top right of the page on their website. If you are using the mobile app (yes, there is one), then you need to go to `My Applets` and hit the `+` sign on the top right corner. You will be prompted to create the `This` part of the applet. Later, you will be prompted to create the `That` portion of the applet hence the name, If This Then That (IFTTT). For the `This` portion, search for Google Assistant. You will have the choice between 4 triggers. We will choose the appropriate trigger for each of the four types of commands we will be using. When setting up the Google Assistant trigger, you can set three commands that will trigger an action. Then, in the `That` portion, you will search for a Webhook action service that will respond to the Google Assistant trigger. In this app, I have coded four components that respond to firebase changes. When you send a voice command to Google Assistant connected to a Firebase Cloud Function, it will update Firebase, which will in turn, update the dashboard in real-time. Let's go through them one by one.

## Updating the Screen Component
*Trigger Type: Say a phrase with a text ingredient*

These are the commands we will use to switch the screen between `weather` and `calendar`. The webhook URL will be: https://[YOUR_CLOUD_FUNCTION_DOMAIN].cloudfunctions.net/updateScreen?screen=$

Notice that the above URL needs your cloud function domain. To find out your cloud function domain, you can go to the Firebase Console, and click `Functions` on the left nav. This will show you a list of all Firebase functions that you have added to your account. In the `Trigger` column, you will see a URL for each cloud function. The domain is the entire part before `.cloudfunctions.net`. Your cloud function domain may look like this: `us-central1-dashboard-12345`. Therefore, your complete URL should be something like this: `https://us-central1-dashboard-12345.cloudfunctions.net/updateScreen?screen=$`. This URL will be placed in the webhook URL when you are done setting the Google Assistant Trigger. The Webhook URL is the `That` part of your Applet. It is also called the action service. Make sure that each webhook uses a GET request.

| Voice Command              | Example Command                 | Text Ingredient |
| -------------------------- | ------------------------------- | --------------- |
| Change the screen to $     | Change the screen to weather    | weather         |
| Change screen to $         | Change screen to calendar       | calendar        |
| Change it to the $ screen  | Change it to the weather screen | weather         |

## Updating the Account Component
*Trigger Type: Say a phrase with a number*

These are the commands we will use to simply subtract from our account. You can update this value at anytime in the Firebase console if you want to change the value. This command will only subtract values and not add to the account. I designed it like this because I did not have any means of pulling from my bank account nor did I want to hook into an API to grab bank account info anyways. This account number could represent anything you like though. The webhook URL will be: https://[YOUR_CLOUD_FUNCTION_DOMAIN].cloudfunctions.net/updateAccount?value=#

| Voice Command               | Example Command                                          | Number |
| --------------------------- | -------------------------------------------------------- | ------ |
| Subtract # from my account  | Subtract two hundred from my account                     | 200    |
| Subtract # from account     | Subtract one hundred from account                        | 100    |
| Subtract # from the account | Subtract one hundred point thirty-three from the account | 100.33 |

## Adding Event Data
*Trigger Type: Say a phrase with a text ingredient*

These commands will add events to our calendar. However, only one text ingredient is allowed on IFTTT, so I had to create a simple trick. Each command must have the word, `on`, as a delimiter between the event name and the date it occurs. The Firebase Cloud Function will then parse out the event name and date and send it to the web application. Look at the `Example Command` column to see what I mean. The webhook URL will be: https://[YOUR_CLOUD_FUNCTION_DOMAIN].cloudfunctions.net/addEvent?str=$

| Voice Command             | Example Command                                   | Text Ingredient          |
| ------------------------- | ------------------------------------------------- | ------------------------ |
| Add $ to my web app       | Add feed cat on March 20th to my web app          | feed cat on March 20th   |
| Add $ to the web calendar | Add pet cat on March 21st to the web calendar     | pet cat on March 21st    |
| Add $ to my web calendar  | Add file taxes on March 22nd to my web calendar   | file taxes on March 22nd |

## Adding Food Expiration Items
*Trigger Type: Say a phrase with a text ingredient*

These commands behave similarly to adding event data. However, now we are adding food expiration events. The voice command may seem awkward, but I had to make sure that the word, `on`, was used as a delimiter and thus had to keep the voice command together instead of spread apart. It would be nice to say something like, `Apples will expire on March 25th`, but then `will expire` gets in the way of the delimiter. Therefore, I had to make these awkward commands as a compromise. As mentioned in the `Alternative Solutions` section, you could use Dialogflow if you want a cleaner command. The webhook URL will be: https://[YOUR_CLOUD_FUNCTION_DOMAIN].cloudfunctions.net/addFoodEvent?str=$

| Voice Command         | Example Command                            | Text Ingredient        |
| --------------------- | ------------------------------------------ | ---------------------- |
| New expiration item $ | New expiration item avocados on March 20th | avocados on March 20th |
| Expiration item $     | Expiration item milk on March 21st         | milk on March 21st     |
| Expiration time $     | Expiration time eggs on March 22nd         | eggs on March 22nd     |

## Starting the App
Finally, let's start the app. Run `npm start` to start both the Vue.js app and Node.js server simultaneously. The Node.js server serves as a proxy to the Dark Sky API, since Dark Sky does not allow cross-origin resource sharing (CORS). They have disabled CORS on their servers. An alternative approach would be to use CORS Anywhere to make requests directly from the client side: https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/[DARKSKY_API_KEY]/42.3601,-71.0589?exclude=[minutely,hourly,flags]. This would allow you to remove the Node portion of this project if you chose to because CORS Anywhere would serve as a proxy. You would still need to use Node.js for the Firebase Cloud Functions, however.

# Alternative Solutions
There are of course alternative ways to build voice controlled web apps. You could have used the Web Speech API that is built into modern browsers, but then you need to make sure your microphone can pick up your voice from the computer running your application. By using Google Assistant on your phone, you can trigger the command from anywhere. Another alternative would be to use Dialogflow, which is a way to build chatbots. Dialogflow allows you to send commands you give it to a Node.js webhook, which then could update components in your web application. This leads to additional code and complexity. However, it would then make Firebase Cloud Functions unnecessary as all of your logic would move to your Node.js webhook logic. I find Firebase Cloud Functions very simple to setup compared to Dialogflow, but Dialogflow is indeed more powerful as it can parse sentences properly instead of relying on my trick to bypass IFTTT's text ingredient limit. It becomes a tradeoff between complexity and improved functionality.