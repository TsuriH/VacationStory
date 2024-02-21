import {unlink} from "fs/promises"

async function deleteImage(imageName: string):Promise<void> {
const imagePath = "./src/1-assets/images/" + imageName
 unlink(imagePath)
 
}

export default deleteImage
