const fs = require('fs');
const slugify = require('slugify');
const handlebars = require('handlebars');


const hbs = {
    render(data, name) {
        const template = fs.readFileSync(`./${name}.hbs`).toString();
        console.log({ template });
        return handlebars.compile(template)(Object.assign( {}, data));
    },
};

const baseUrl = '../docs';
const dataFilePath = '/home/ubuntu/products-dump/product_reviews';

const seoInformation = (_post) => {
    const post = _post;
    post.slug = slugify(post.title);
    post.author = 'Suvojit Manna';
    post.seo = {
        title: post.title,
        tags: post.title,
        description: post.title,
    };
    post.created_at  = new Date();
    post.updated_at = new Date();

    return post;
};

const save = async (f) => {
    const product = require(f);

    const post = {
        title: product.prod_name,
    };

    const allSentences = [];
    post.reviews = product
        .reviews
        .map(x => {
            allSentences.push(...x.sentences.filter(x => x.polarity));
            return x.review_text;
        });

    post.positive_reviews = [];
    post.negative_reviews = [];
    const sorted = allSentences
        .sort((a, b) => (b.polarity - a.polarity))
        .forEach(x => {
            if(x.polarity > 0) post.positive_reviews.push(x.text);
            post.negative_reviews.push(x.text);
        });
    post.positive_reviews = post.positive_reviews.slice(0, 100);
    post.negative_reviews = post.negative_reviews.slice(0, 100);
    console.log({ sorted });

    const renderedMarkdownFile = hbs.render(seoInformation(post), 'readme');
    fs.writeFileSync(`${baseUrl}/products/${ post.slug}.md`, renderedMarkdownFile)
};

const run = async () => {
    console.log('starting run');
    const files = fs.readdirSync(dataFilePath);

    for(let i =0; i < files.length; i += 1){
        const file = files[i];
        try {
            console.log('iterating', file);
            await save(`${dataFilePath}/${file}`)
        } catch (err) {
            console.log('error while', file, err.message)
        }
    }
};

run();

