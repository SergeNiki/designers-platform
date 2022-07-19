import classes from "./SubCreateForm.module.css"

type SubCreateFormProps = {
    
}

type SubInputs = {
    sub_name: string
    sub_image: any
    sub_description: string
    sub_price: string
}

const SubCreateForm = (props: SubCreateFormProps) => {


    return <form action="" className={classes.sub_form} >
        <div className={classes.sub_name + " " + classes.form_item} >
            <label htmlFor="sub_name">Название подписки</label>
            <input id="sub_name" type="text" />
        </div>
        <div className={classes.sub_image + " " + classes.form_item} >
            <label htmlFor="sub_image">Обложка подписки</label>
            <input id="sub_image" type="file" />
        </div>
        <div className={classes.sub_description + " " + classes.form_item} >
            <label htmlFor="sub_description">Описание подписки</label>
            <input id="sub_description" type="text" />
        </div>
        <div className={classes.sub_price + " " + classes.form_item} >
            <label htmlFor="sub_price">Месячная стоимость (в руб.)</label>
            <input id="sub_price" type="text" />
        </div>
        <button type="submit">Создать</button>
    </form>
}

export default SubCreateForm