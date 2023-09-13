export interface RSSOptions {
    copyright: string;
    description: string;
    language: string;
    title: string;
    url: string;
}

export interface RSSItem {
    title:  string;
    description: string;
    url: string;
    guid: string;
    categories: string[];
    author: string;
    date: string;
    imageUrl: string;
}

export default class RSS {
    options: RSSOptions;
    items: RSSItem[];

    constructor(options: RSSOptions) {
        this.options = options;
        this.items = [];
    }

    addItem(item: RSSItem) : void {
        this.items.push(item);
    }

    createXML() : string {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n`;

        xml +=  this.createTag("title", this.options.title) + 
                this.createTag("link", this.options.url) +
                this.createTag("description", this.options.description) +
                this.createTag("language", this.options.language) +
                this.createTag("copyright", this.options.copyright);
        
        this.items.forEach((item : RSSItem) => {
            xml += this.createItem(item);
        })

        xml += "</channel>\n</rss>";

        return xml;
    }

    private createItem(item: RSSItem) : string {
        let rssItem : string = "<item>\n";

        rssItem +=  this.createTag("title", item.title) +
                    this.createTag("link", item.url) + 
                    this.createTag("description", item.description) +
                    this.createTag("author", item.author) + 
                    this.createTag("guid", item.guid) + 
                    this.createTag("pubDate", item.date);
        
        rssItem += `<enclosure url="${item.imageUrl}" length="0" type="image/jpg"/>`;

        item.categories.forEach((category: string) => {
            rssItem += this.createTag("category", category);
        })

        rssItem += "</item>\n";

        return rssItem;
    }

    private createTag(tag: string, content: string) : string {
        return `<${tag}>${content}</${tag}>\n`;
    }
}