function fillingProducts(data){


    var base = document.getElementById('base');

    var table = document.createElement('table');
    table.style.tableLayout="fixed";
    table.id="products_table";

    var tbody = document.createElement('tbody');

    for(let i = 0; i < data.length;){
        let tr = document.createElement('tr');

        for(let j = 0; j < 3; j++,i++){
                if (i === data.length)
                    break;
            // if(data[i].type === selected.value || selected.value === "Все") {
                let td = document.createElement('td');
                td.style.width = "33%"
                let div = document.createElement('div');
                div.className = "rectangle";
                div.style.padding = "5%";
                // td.style.border = "1rem solid #ddd";

                let img = document.createElement('img');
                let divImg = document.createElement('div');
                divImg.className = "row justify-content-center";
                img.className = "product-img row";
                // console.log(data[i]);
                img.src = data[i].img;
                img.onclick = openImg;

                divImg.appendChild(img);

                let divName = document.createElement('div');
                let name = document.createElement('p');
                divName.className = "row justify-content-center product-name";
                name.textContent = data[i].name;
                divName.appendChild(name);

                let divType = document.createElement('div');
                let type = document.createElement('p');
                type.textContent = data[i].type;
                divType.className = "row justify-content-center about-product";
                divType.appendChild(type);

                let divHow = document.createElement('div');
                divHow.className = "row justify-content-center about-product";
                divHow.style.paddingBottom = "10%";
                // let a = document.createElement('a');
                // let button = document.createElement('img');
                // button.src = "img/icons/Button_how_.png";
                // button.style.width = "90%";
                // button.style.height = "100%";
                // a.appendChild(button);

                let button = document.createElement('button');

                button.textContent = "Как заказать?";
                button.className = "btn-open-popup";
                button.onclick = openPopup;

                divHow.appendChild(button);

                // td.appendChild(img);
                //
                // td.appendChild(name);
                // td.appendChild(type);
                div.appendChild(divImg);
                div.appendChild(divName);
                div.appendChild(divType);
                div.appendChild(divHow);
                td.appendChild(div);
                tr.appendChild(td);
            }

        // }
        tbody.appendChild(tr);

    }
    table.appendChild(tbody);
    base.appendChild(table);

    document.body.appendChild(base);

}

function checkStyle(data, selected){

    const prev_table = document.getElementById('products_table');

    const parent = prev_table.parentNode;
    //
    parent.removeChild(prev_table);
    // document.removeChild(prev_table.parentNode);

    // var selected = document.getElementById('category');
    console.log(selected);
    var tempArray = [];
    var tempIndex = 0;
    for(let i = 0; i < data.length;i++){
        if(data[i].type === selected || selected === "Все"){
            tempArray[tempIndex] = data[i];
            tempIndex++;
            // console.log(tempArray[tempIndex]);
            // console.log(data[i]);
            //alert(tempArray[i]);
        }
    }

    console.log(tempArray);
    fillingProducts(tempArray);
}

function start(select) {
    $.ajax({
        url: '/api/data',
        method: 'GET',
        success: function (data) {
            checkStyle(data,select);
            obj = data;
        },
        error: function () {
            console.error('Ошибка при получении данных');
        }
    });
}

function main_products() {
    $.ajax({
        url: '/api/main_products',
        method: 'GET',
        success: function (data) {
            checkStyle(data);
            obj = data;
        },
        error: function () {
            console.error('Ошибка при получении данных');
        }
    });
}

start("Все");