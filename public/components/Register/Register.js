export class RegisterForm {
    
    config = {
    
        registerLabel: {
            text: 'Регистрация',
            tag: 'label',            
        },
    
        usernameEntry: {
            text: 'Имя',
            tag: 'input',
        },

        registerEmailEntry: {
            text: 'Email',
            tag: 'input',
        },
    
        registerPasswordEntry: {
            text: 'Пароль',
            tag: 'input',
        },

        registerSubmitBtn: {
            text: 'Зарегистрироваться',
            tag: 'button',
        },
        
    };
    
    render( formName ) {
        const form = document.createElement('form');
        //form.id = formName;


        const bigObj = this.config;
    
        for (const key in bigObj) {
          
          const tag = bigObj[key]['tag'];

          const newElement = document.createElement( tag );
          newElement.id = key;

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
            case 'submit': 
                newElement.innerText = bigObj[key]['text'];
                break
              
          }

          form.appendChild(newElement);
          
        
        }
        /*const template = Handlebars.templates['Register.hbs'];
          
        const items = 

        form.innerHTML = template({items});*/

        return form;
        
    }
   
}



