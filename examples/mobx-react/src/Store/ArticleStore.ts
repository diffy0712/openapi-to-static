import { observable, action, computed, autorun } from "mobx"

import { Article } from "../Service/Main/Schemas/Article";
import { ApiArticles, ApiArticlesInterface } from "../Service/Main/Services/ApiArticles";

export class ArticleStore {
	@observable articles: Article[] = [];
    @observable pendingRequests = 0;

    constructor(protected articleService: ApiArticlesInterface) {
        autorun(() => console.log(this.report));
        this.getArticles();
    }
  
    @action async getArticles() {
        const articleResponse = await this.articleService.getArticles();
        const articles = articleResponse.data.articles;
        this.articles = articles;
    }

	@computed get completedArticlesCount() {
    	return this.articles.filter(
			article => article.awesomeness === true
		).length;
    }

	@computed get report() {
		if (this.articles.length === 0)
			return "<none>";
		const nextArticle = this.articles.find(article => article.awesomeness === false);
		return `Next todo: "${nextArticle ? nextArticle.title : "<none>"}". ` +
			`Progress: ${this.completedArticlesCount}/${this.articles.length}`;
	}

	async addArticle(title: string, description: string) {
        const article = {
            title,
            description,
            slug: title,
            body: 'some body',
            awesomeness: false
		};
        await this.articles.push(article);
        await this.articleService.createNewArticle(article);
	}
}

export const articleStore = new ArticleStore(
    ApiArticles
);