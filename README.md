This project is a major refactoring of the previously coded [task manager app](https://github.com/Kepmon/task-manager).

The whole project is intended to be migrated to Nuxt 3 (from Vue 3) and I hope to address various issues, on this occasion. All current problems and my ideas (for how to resolve them) were described in the previous project's README.

This new version of this project is supposed to implement solutions for the previously mentioned issues, including:
* **rendering mode** - currently, the original project is written with Vue that uses SPA as its rendering mode. This is obviously wrong due to:
  - the app-like nature of that project: due to that fact, the overall bundle size is way to large and it's supposed to be reduced by moving a significant part of actions to a server,
  - security issues: in order to use the app, a user needs to create an account and log in afterwards. Since I'm using `Firebase` as backend, my API keys are publicly available.
* database structure - I still struggle with making this right and I'll probably have to ask more experienced developers for help, but deep down I know that there's no point of fixing the database structure in the SPA app; that's why this issue will be also addressed on this occation.
* mess in code - as I have been coding this app for around a year now, almost the whole app's code was repeatedely changed and new features were added at different times of the app's lifecycle. I was also constantly learning during this time, so today I'm significantly smarter than a year ago. This resulted in an overall mess and "wrongness" in both CSS and TS as well as accessibility. Therefore, I intend to fix at least most of those issues along the way.
* the server-side validation as well as backend-data validation (using Zod) are meant to be added.
* accessibility - much to it, probably, but one of my biggest concern was the error popup that I didn't know how to make it (properly) accessible. Currently, the focus is being switched onto it, when it shows up. From the very beginning I knew it was a bad idea but I didn't have a better one. Currently, I believe I came up with one and I intend to implement it.

**The content of this README will be obviously being updating on a regular basis as I'm progressing with the app.**