const product = require('../Model/Product.js'); // `product` is the model
const cloudinary = require('../Config/CloudinaryConfig.js');
const fs = require('fs');
const Product = require('../Model/Product.js');

// const uploadToCloudinary = async (filePath) => {
//     const result = await cloudinary.uploader.upload(filePath);
//     fs.unlinkSync(filePath); // delete after upload
//     return result.secure_url;
// };

const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};


const AddProduct = async (req, res) => {
    try {
        const imageFields = ['FirstImage', 'SecondImage', 'ThirdImage', 'FourthImage'];
        const imageUrls = {};

        for (const field of imageFields) {
            if (req.files[field]) {
                const fileBuffer = req.files[field][0].buffer;
                const cloudinaryUrl = await uploadToCloudinary(fileBuffer);
                imageUrls[field] = cloudinaryUrl;
            }
        }

        const {
            ProductName,
            ProductDescrption,
            ProductCategory,
            ProductSubCategory,
            ProductPrice,
            ProductSizes,
            Addtobestseller
        } = req.body;

        const newProduct = new Product({
            FirstImage: imageUrls.FirstImage || '',
            SecondImage: imageUrls.SecondImage || '',
            ThirdImage: imageUrls.ThirdImage || '',
            FourthImage: imageUrls.FourthImage || '',
            ProductName,
            ProductDescrption,
            ProductCategory,
            ProductSubCategory,
            ProductPrice,
            ProductSizes: Array.isArray(ProductSizes) ? ProductSizes : [ProductSizes],
            Addtobestseller
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            files: req.files
        });
    }
};


// const AddProduct = async (req, res) => {
//     try {
//         debugger
//         const imageFields = ['FirstImage', 'SecondImage', 'ThirdImage', 'FourthImage'];
//         const imageUrls = {};
//      //  console.log(req.files);
//         for (const field of imageFields) {
//             if (req.files[field]) {
//                 const localPath = req.files[field][0].path;
//                 const cloudinaryUrl = await uploadToCloudinary(localPath);
//                 imageUrls[field] = cloudinaryUrl;
//             }
//         }


//         const {
//             ProductName,
//             ProductDescrption,
//             ProductCategory,
//             ProductSubCategory,
//             ProductPrice,
//             ProductSizes,
//             Addtobestseller
//         } = req.body;

//         console.log(imageFields,imageUrls)
//         const newProduct = new product({
//             FirstImage: imageUrls.FirstImage || '',
//             SecondImage: imageUrls.SecondImage || '',
//             ThirdImage: imageUrls.ThirdImage || '',
//             FourthImage: imageUrls.FourthImage || '',
//             ProductName,
//             ProductDescrption,
//             ProductCategory,
//             ProductSubCategory,
//             ProductPrice,
//             ProductSizes,
//             Addtobestseller
//         });

//         await newProduct.save();

//         res.status(201).json({
//             success: true,
//             message: "Product added successfully",
//             data: newProduct
//         });

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message,
//             files:req.files
//         });
//     }
// };

const GetAllProducts = async (req, res) => {
    try {
        const AllProducts = await product.find({});
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: AllProducts
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const DeleteProductById=async(req,res)=>{
    try {
        const { _Id } = req.params;
        const singleprod = await Product.findById(_Id);
        if (singleprod) {
            await Product.findByIdAndDelete(_Id);
            res.json(200).json({
                success: true,
                message: "Product deleted successfully"
            })
        }
        else {
            res.json(400).json({
                success: false,
                message: "Error whle deleting"
            })
        }
    }
    catch (error) {
    res.status(400).json({
        success: false,
        message: error.message
    })
}
}

const Getbestsellerproducts=async(req,res)=>{
    try{
         const GetAllbestsellProd=await Product.find({Addtobestseller:true});
         if(GetAllProducts){
            res.status(200).json({
               success:true,
               message:"Best Seller Product Fetched Successfully",
               data:GetAllbestsellProd
            })
         }
         else{
            res.status(400).json({
                success:false,
                message:"Bad Request"
            })
         }
    }
    catch(error){
        res.json(400).json({
            success:false,
            message:error.message
        })
    }
}

const GetSingleProduct=async(req,res)=>{
    try{
        const { _Id } = req.params;
        //console.log(_Id)
        const singleprod = await Product.findOne({_id:_Id});
        if(singleprod){
            res.status(200).json({
                success:true,
                message:"Record fetched successfully",
                data:singleprod
            })
        }else{
            res.status(400).json({
                success:false,
                message:"Failed to fetch the record",
                data:null
            })
        }
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = { AddProduct, GetAllProducts,DeleteProductById,Getbestsellerproducts,GetSingleProduct };
