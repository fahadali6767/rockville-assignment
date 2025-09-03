"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const categories_module_1 = require("./categories/categories.module");
const movies_module_1 = require("./movies/movies.module");
const ratings_module_1 = require("./ratings/ratings.module");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_modal_1 = require("./database/category/category.modal");
const category_seed_1 = require("./database/category/category.seed");
const movie_modal_1 = require("./database/movie/movie.modal");
const movie_seed_1 = require("./database/movie/movie.seed");
const media_module_1 = require("./media/media.module");
let AppModule = class AppModule {
    connection;
    categoryModel;
    movieModal;
    configService;
    constructor(connection, categoryModel, movieModal, configService) {
        this.connection = connection;
        this.categoryModel = categoryModel;
        this.movieModal = movieModal;
        this.configService = configService;
    }
    async seedCategories() {
        return await this.categoryModel.insertMany(category_seed_1.categortData);
    }
    async seedMovies(insertedCategories) {
        insertedCategories.forEach((category, index) => {
            movie_seed_1.movieData[index].category = category._id;
        });
        return await this.movieModal.insertMany(movie_seed_1.movieData);
    }
    async onModuleInit() {
        try {
            const state = this.connection.readyState;
            console.log(`MongoDB connection state: ${state}`);
            const dbName = this.configService.get('MONGO_DB');
            const host = this.configService.get('MONGO_DB_HOST');
            const port = this.configService.get('MONGO_DB_PORT');
            console.log(`Using MongoDB: ${host}:${port}/${dbName}`);
            if (state === 1) {
                const count = await this.categoryModel.countDocuments();
                if (count === 0) {
                    const insertedCategories = await this.seedCategories();
                    await this.seedMovies(insertedCategories);
                    console.log('categories and movies data seeded');
                }
                console.log('✅ MongoDB is connected');
            }
            else {
                console.log('❌ MongoDB is not connected');
            }
        }
        catch (error) {
            console.error('Error checking MongoDB connection:', error);
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const dbName = configService.get('MONGO_DB');
                    const host = configService.get('MONGO_DB_HOST');
                    const port = configService.get('MONGO_DB_PORT');
                    const poolSize = configService.get('MONGO_POOL_SIZE');
                    const uri = `mongodb://${host}:${port}/${dbName}?maxPoolSize=${poolSize}`;
                    console.log(`Connecting to MongoDB: ${uri}`);
                    return {
                        uri,
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            categories_module_1.CategoriesModule,
            movies_module_1.MoviesModule,
            ratings_module_1.RatingsModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'Category', schema: category_modal_1.categorySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Movie', schema: movie_modal_1.movieSchema }]),
            media_module_1.MediaModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __param(0, (0, common_1.Inject)((0, mongoose_1.getConnectionToken)())),
    __param(1, (0, mongoose_1.InjectModel)('Category')),
    __param(2, (0, mongoose_1.InjectModel)('Movie')),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map