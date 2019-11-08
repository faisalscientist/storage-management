# Laravel Typescript Session
Typescript Package For Localstorage data manipulation mimicing laravel's session methods.

# About
A typescript package that enables you to work with data in your localstorage (currently made for frontend applications) using laravel's session methods like get, put, forget, flush, push, pull and has. The session data is encrypted to give your data some sense of security.

# Installation
The prefered installation method is via npm. Run:
```js
   npm install laravel-ts-session
```

# Usage
To use the package, you need to import it into your component:
```js
   import Session from 'laravel-ts-session';
```

Then you can instantiate it
```js
   session: Session = new Session();
```

# Methods
Find below the methods currently avaialble for session data manipulation

## get
Retrieving data from session
```js
  this.session.get('key')
```

## put
Inserting a new data in session
```js
  this.session.put('key', 'value')
```

## forget
Removing a particular data from session
```js
  this.session.forget('key')
```

## flush
Removing all data from session (clear)
```js
  this.session.flush()
```

## pull
Retrieving data from session & removing it afterwards.
```js
  this.session.pull('key')
```

## push
If the values of the data is an array/object, you can push new values into the data with the push method
```js
  this.session.push('key', 'new values')
```

## has
A check to see if a key exists in session
```js
  this.session.has('key')
```

# Optional
You can pass an optional parameter to the methods which would returned if returned if the specified key does not exist in the session

```js
  this.session.get('key', 'default')
```
