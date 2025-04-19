import cookie_run_theme from './assets/themes/cookie_run_theme.json' with {type:"json"};
import celeste_theme from './assets/themes/celeste_theme.json' with {type:"json"};

console.log(cookie_run_theme)

//Options Settings
let showCanvasImageName = false;

// #region DOM Elements Variables
const body = document.getElementsByTagName("BODY")[0];
const load_button = document.getElementById("button-load");
const new_button = document.getElementById("button-new");
const save_button = document.getElementById("button-save");
const theme_button = document.getElementById("button-theme");
const layer_container = document.getElementById("layer-container");
const canvas = document.getElementById("canvas");
const create_project_menu  = document.getElementsByClassName("create-project-menu")[0];

const button_close_create_project_menu = document.getElementById("button-close-create-project-menu");
const next_theme_button = document.getElementById("next-theme-button");
const close_theme_button = document.getElementById("close-theme-button");
const change_theme_menu = document.getElementsByClassName("change-theme-menu")[0];
// #endregion

// #region Theme Variables and DOM
let themesList = [cookie_run_theme, celeste_theme];
let actualTheme = 0;
const returnThemePath = (selectedTheme) => {
    return "url(./assets/images/theme/" + selectedTheme.background_image + ")";
};
body.style.backgroundImage = returnThemePath(themesList[actualTheme]);
// #endregion

// #region Canvas Variables
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000; 
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.width = CANVAS_WIDTH;
canvas.style.height = CANVAS_HEIGHT;
// #endregion

// #region Camera Variables
var image_list = new Array();
var next_id = 0;
var cam_zoom_size = 1;
var cam_x = 0;
var cam_y = 0;
var cam_move = false;
var mouse_pos_x = 0;
var mouse_pos_y = 0;
var mouse_pos_prev_x = mouse_pos_x;
var mouse_pos_prev_y = mouse_pos_y;
var x_ratio = (CANVAS_WIDTH * cam_zoom_size)/CANVAS_WIDTH;
var y_ratio = (CANVAS_HEIGHT * cam_zoom_size)/CANVAS_HEIGHT;
// #endregion


// Mouse Variables

ctx.scale(1/cam_zoom_size, 1/cam_zoom_size);

// #region Load and Save Functions

const loadCamSave = () => {

    cam_x_saved_data = localStorage.getItem("camX");
    cam_y_saved_data = localStorage.getItem("camY");
    cam_zoom_size_saved_data = localStorage.getItem("camZoomSize");

    if (!cam_x_saved_data === null) {
        cam_x = Number(cam_x_saved_data);
    }

    if (!cam_y_saved_data === null) {
        cam_y = Number(cam_y_saved_data);
    }
    
    if (!cam_zoom_size_saved_data === null) {
        cam_zoom_size = Number(cam_zoom_size_saved_data);
    }

    resizeCanvas();
}

const saveCamData = () => {
    localStorage.setItem("camX",cam_x.toString());
    localStorage.setItem("camY",cam_y.toString());
    localStorage.setItem("camZoomSize",cam_zoom_size.toString());
};

const newSaveData = () => {
    localStorage.setItem('imageList', "");
    localStorage.setItem('nextID',0);
    next_id = 0;
};

const loadSaveData = () => {
    const json_string = localStorage.getItem('imageList');
    next_id = localStorage.getItem('nextID');

    if (json_string === null && next_id === null) {
        return;
    }

    if (json_string == "") {
        removeAllLayers();
        image_list = [];
        redrawImages();
        recreateLayerDom();
        return;
    }

    json_data = JSON.parse(json_string);
    image_list = json_data.image_list;
    redrawImages();
    recreateLayerDom();
    loadCamSave();
};

const save = () => {
    save_data = {"image_list":image_list};
    localStorage.setItem('imageList', JSON.stringify(save_data));
    localStorage.setItem('nextID',next_id);
    saveCamData();
};

// #endregion


// #region Canvas and Image Functions

const removeAllLayers = () => {
    while (layer_container.firstChild) {
        layer_container.removeChild(layer_container.firstChild);
    }
}

const createImage = async (urlImageBlob) => {
    const imageStruct = {
        "x":mouse_pos_x+cam_x,
        "y":mouse_pos_y+cam_y,
        "width":0,
        "height":0,
        "image":await blobToBase64(urlImageBlob),
        "selected":false,
        "id":next_id,
        "name":"layer"+next_id.toString(),
    };
    image_list.push(imageStruct);
    next_id++;
};

const resizeCanvas = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (cam_zoom_size < 1 ) {
        ctx.scale(Math.abs(10-(10*cam_zoom_size)), Math.abs(10-(10*cam_zoom_size)));
    }
    else {
        ctx.scale(1/cam_zoom_size, 1/cam_zoom_size);
    }
    redrawImages();
};

// #endregion


// #region Other Functions and Event Handlers

theme_button.addEventListener('click', (event) => {
    showThemeMenu();
})

next_theme_button.addEventListener('click', (event) => {
    actualTheme++;
    if (actualTheme >= themesList.length) {
        actualTheme = 0;
    }
    body.style.backgroundImage = returnThemePath(themesList[actualTheme]);
})

close_theme_button.addEventListener('click', (event)=>{
    hideThemeMenu();
})

load_button.addEventListener('click', (event) => {
    loadSaveData();
})

new_button.addEventListener('click', (event) => {
    //showCreateProjectMenu();
    newSaveData();
    loadSaveData();
})

save_button.addEventListener('click',(event)=> {
    save();
})

canvas.addEventListener('contextmenu',(event)=>{
    event.preventDefault();
    return false;
})

canvas.addEventListener('wheel',(event) => {
    var wheel_dir = Math.sign(event.deltaY);
    cam_zoom_size = Math.max(0.1,cam_zoom_size+(0.1*wheel_dir));
    resizeCanvas();
})

canvas.addEventListener('mousedown', async (event) => {
    if (event.button == 0) {
        await selectImage(mouse_pos_x+cam_x, mouse_pos_y+cam_y);
        layer_container.style.pointerEvents = 'none';
    }
    if (event.button == 2) {
        cam_move = true;
        layer_container.style.pointerEvents = 'none';
    }
})

canvas.addEventListener('mouseup', async (event) => {
    event.preventDefault();
    await deselectImage();
    layer_container.style.pointerEvents = 'auto';
    if (event.button == 2) {
        cam_move = false;
    }
})

document.addEventListener('keydown', (event) => {

    event.preventDefault();

    if (event.ctrlKey && (event.key === 'v' || event.key === 'V')) {
        pasteImage(event);
    }

    if (event.key === 'Delete') {
        deleteSelectedLayer();
    }
});

button_close_create_project_menu.addEventListener("click", (event) => {
    hideCreateProjectMenu();
});

const deleteSelectedLayer = async () => {
    for (image of image_list) {
        if (image.selected) {
            let index = image_list.indexOf(image);
            image_list.splice(index,1);
            break;
        }
    }
    await recreateLayerDom();
    await redrawImages();
}

canvas.addEventListener('mousemove', (event) => {

    let camera_actual_size;
    if (cam_zoom_size >= 1) {
        camera_actual_size = cam_zoom_size;
    } else {
        camera_actual_size = 1/Math.abs((10-(10*cam_zoom_size)));
    }

    mouse_pos_x = event.offsetX * camera_actual_size;
    mouse_pos_y = event.offsetY * camera_actual_size;

    let mouse_x_mov = (mouse_pos_x - mouse_pos_prev_x);
    let mouse_y_mov = (mouse_pos_y - mouse_pos_prev_y);

    const rect = canvas.getBoundingClientRect();

    moveImage(mouse_x_mov, mouse_y_mov);

    if (cam_move) {
        moveCamera(mouse_x_mov, mouse_y_mov);
    }

    mouse_pos_prev_x = mouse_pos_x;
    mouse_pos_prev_y = mouse_pos_y;
})

const pasteImage = async (event) => {
    
    const clipboardContents = await navigator.clipboard.read();

    for (const item of clipboardContents) { 
        for (const type of item.types) {
            if (!type.startsWith("image/")) {
                continue;
            }
            const blob = await item.getType(type);
            await createImage(blob);
            await recreateLayerDom();
            await redrawImages();
        }
    }
    
};

const recreateLayerDom = async () => {
    removeAllLayers();
    console.log(image_list);
    for (var image of image_list) {
        createLayer(image);
    }
}

const createLayer = async (image) => {
    //Create Layer Div
    const layer_div = document.createElement("div");
    layer_div.className = "layer-info";

    //Create Image
    const img = document.createElement("img");
    img.className = "layer-info-img";
    img.src = image.image;
    img.onload = async () => {
        await layer_div.append(img);

        //Layer info
        const layer_name = document.createElement("div");
        layer_name.className = "layer-info-name";
        layer_name.innerText = image.name;
        layer_div.append(layer_name);

        //Layer Visibility
        const layer_visibility = document.createElement("input");
        layer_visibility.className = "layer-info-visibility";
        layer_visibility.type="checkbox";
        layer_visibility.checked = true;
        layer_div.append(layer_visibility);

        //Layer Delete Icon
        const layer_delete_button = document.createElement("button");
        layer_delete_button.className = "layer-info-delete-button";
        layer_delete_button.type = "submit";
        layer_delete_button.addEventListener('click', (event) => {
            event.preventDefault();

        });

        const layer_delete_icon = document.createElement("img");
        layer_delete_icon.className = "layer-info-delete-icon";
        layer_delete_icon.src = "assets/images/trash.png";
        layer_delete_button.append(layer_delete_icon);
        layer_div.append(layer_delete_button);

        //Append layer_div to layer_container
        layer_container.append(layer_div);
        redrawImages();
    };   
}

const outOfCanvasBoundaries = (x,y,width,height) => {
    return (
        (x > cam_x + CANVAS_WIDTH*cam_zoom_size) 
        && (x + width <= cam_x)
        && (y > cam_y + CANVAS_HEIGHT*cam_zoom_size)
        &&  (y + height <= cam_y)
    );
}

const redrawImages = async () => {
    if (cam_zoom_size >= 1) {
        ctx.clearRect(0,0,CANVAS_WIDTH*cam_zoom_size,CANVAS_HEIGHT*cam_zoom_size);
    }
    else {
        ctx.clearRect(0,0,CANVAS_WIDTH*Math.abs(10-(10*cam_zoom_size)),CANVAS_HEIGHT*Math.abs(10-(10*cam_zoom_size)));
    }
    for (var image of image_list) {
        console.log(cam_x, image.x+image.width);
        //console.log(outOfCanvasBoundaries(image.x, image.y, image.width, image.height));
        if (outOfCanvasBoundaries(image.x, image.y, image.width, image.height)) {
            console.log("working");
            continue;
        }
        let new_image_div = document.createElement("img");
        new_image_div.src = image.image;
        const draw = async () => {
            image.width = new_image_div.width;
            image.height = new_image_div.height;
            ctx.font = "24px arial";
            if (showCanvasImageName) {
                ctx.fillText(image.name,image.x - cam_x, image.y - cam_y - 4);
            }
            ctx.drawImage(new_image_div, image.x - cam_x, image.y - cam_y);
        };
        new_image_div.onload = await draw();
    }
    
    
};

const detectMouseInsideImage = (mouseX,mouseY,imageX,imageY,width,height) => {

    let collision = 
        mouseX >= imageX 
        && mouseY >= imageY
        && mouseX <= imageX+width
        && mouseY <= imageY+height;

    return collision;
};

const selectImage = async (mouseX, mouseY) => {
    let only_one_selected = false;
    image_list.reverse();
    for (var image of image_list) {
        image.selected = false;
        if (detectMouseInsideImage(mouseX, mouseY,image.x,image.y,image.width,image.height) && !only_one_selected) {
            image.selected = true;
            only_one_selected = true;
        }
    }
    image_list.reverse();  
};

const deselectImage = async () => {
    for (var image of image_list) {
        image.selected = false;
    }
};

const moveCamera = async (mouseX, mouseY) => {
    cam_x += mouseX;
    cam_y += mouseY;
    redrawImages();
};

const moveImage = async (mouseX, mouseY) => {
    let layers_id = 0;
    for (var image of image_list) {
        if (image.selected) {
            image.x += mouseX;
            image.y += mouseY;
            redrawImages();
        }
        layers_id++;
    }
};

const base64ToBlob = (base64, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length;
        offset += sliceSize) {
        const slice = byteCharacters.slice(
            offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

// #endregion


const hideCreateProjectMenu = () => {
    create_project_menu.style.display = "none";
};

const hideThemeMenu = () => {
    change_theme_menu.style.display = "none";
}

const showThemeMenu = () => {
    change_theme_menu.style.display = "block";
}

const showCreateProjectMenu = () => {
    create_project_menu.style.display = "block";
}


// DOM and logic things when the pages load
hideCreateProjectMenu();
hideThemeMenu();
loadSaveData();