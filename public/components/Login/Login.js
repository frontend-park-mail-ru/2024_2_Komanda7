export class LoginForm {
    
    loginContent = {
    
        loginLabel: {
            text: 'Вход',
            tag: 'label',            
        },
    
        emailEntry: {
            text: 'Email',
            tag: 'input',
        },
    
        passwordEntry: {
            text: 'Пароль',
            tag: 'input',
        },

        submitBtn: {
            text: 'Войти',
            tag: 'button',
        },
        
    };
    
    renderLogin() {
        const form = document.createElement('form');
    

        const bigObj = this.loginContent;
    
        for (const key in bigObj) {
          //alert(key);
      
          //alert(bigObj[key]['tag']);
          const tag = bigObj[key]['tag'];

          const newElement = document.createElement( tag );

          switch(tag) {
            case 'input':  
                newElement.placeholder = bigObj[key]['text'];
                break
            case 'label':
                newElement.innerText = bigObj[key]['text'];
                break
            case 'button': 
                newElement.innerText = bigObj[key]['text'];
                break
              
          }

          form.appendChild(newElement);
        
        }

        return form;
        
    }
   
}



