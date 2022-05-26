## Vanilla NodeJS REST API server

---

**How to use it..**

<br/>

#### Get all todos

```
fetch('http://localhost:5001/todos')
        .then(res=>res.json())
        .then(json=>console.log(json))
```

#### Get singel todo

```

fetch('http://localhost:5001/todos/1652746090681')
        .then(res=>res.json())
        .then(json=>console.log(json))

```

#### Add a todo

```
fetch('http://localhost:5001/todos',{
          method:"POST",
          body:JSON.stringify(
              {
                  todo: "Walk my dog"
              }
          )
      })
          .then(res=>res.json())
          .then(json=>console.log(json))
```

#### Change a todo (fully)

```
fetch('http://localhost:5001/todos/1653566766543',{
          method:"PUT",
          body:JSON.stringify(
              {
                  todo: "Walk my two dogs",
                  completed: true
              }
          )
      })
          .then(res=>res.json())
          .then(json=>console.log(json))
```

#### Change a todo (partialy)

```
fetch('http://localhost:5001/todos/1653566766543',{
          method:"PATCH",
          body:JSON.stringify(
              {
                  completed: true
              }
          )
      })
          .then(res=>res.json())
          .then(json=>console.log(json))
```

#### Delete a todo

```
fetch('http://localhost:5001/todos/1653566766543',{
        method:"DELETE"
      })
        .then(res=>res.json())
        .then(json=>console.log(json))
```
