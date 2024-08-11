# URBAN PLANNERS

![Urban planner](/client/public/images/UrbanPlanner.jpg)
![Chatbot Page](/client/public/images/Chatbot.jpg)
![Chatbot Page Backend](/client/public/images/Chatbot-backend.jpg)

## [2024]

This app is n ai driven application that leverages AI to generate, analyze, and visualize comprehensive urban development plans based on user inputs.

## Push

git add . && git commit -m "m" && git push aws
12



## Demo Website

- 👉 Render : [Link to deployed backend site](https://hackathon-teampurse.onrender.com/)
- 👉 Vercel : [Link to deployed frontend site but couldn't be intergrated with the ai](https://hackathon-team-purse.vercel.app/)


## Run Locally

### 1. Clone repo

```shell
     git clone https://github.com/Giftmasil/Hackathon-teamPurse.git
     cd Hackathon-teamPurse
```

### 2. Create .env File

- duplicate .env.example in backend folder and rename it to .env


### 4. Run AI

```shell
 cd chatbot-ai
 pip install -r requirements.txt
 streamlit run app.py
```

## 4.1 Run Backend in Dev Mode

```shell
 cd backend
 npm install
 npm run dev
```

### 5. Run Frontend

```shell
# open new terminal
$ cd frontend
$ npm install
$ npm run build
$ npm start
```

## 5.1 Run Frontend in Dev Mode

```shell
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

## 9. Deploying

- Deploy to Vercel for frontend
- Deploy to Render for backend


## 10. Potential bugs to encounter

- The frontend will not be able to use the Ai because of cors error so just use the backend link using streamlit.

## Support

- Contact Builder: [Gift](mailto:masilagift@gmail.com)
