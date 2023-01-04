# Dall-E 2 React Interface

Dalle2 OpenAI Dashboard is a tool that allows users to generate images based on a prompt using the OpenAI API. 

> OpenAI Dalle2 has a timeout serving specific images for an amount of time. 
> **Therefore localstorage has to be cleared when images are not displaying**
>
> *A solution for this will be to use filestorage that downloads the images on request and defines the id on localstorage, pointing to the correct image location*

A feature to use in the future, using an image storing server serving stored images and serve stored images after fetching from OpenAI.


## Manually clear localStorage due to image timeout

A "Clear Local Storage" button has been added to home
or run this command in your console.  
```js
localStorage.clear()
```
Tags are also locally addable by typing a creating a tag in the dropdown field.

## API
```ts
import { Configuration, OpenAIApi } from "openai"

export const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
export const configuration = new Configuration({
  apiKey: apiKey,
});
export const openai = new OpenAIApi(configuration);

export async function generateImage(prompt: string) {
  return openai.createImage({
    prompt: prompt,
    n: 5,
    size: "512x512",
  })
}
```

Here is an example of how to use the generateImage function:

```ts
import { generateImage } from "./utils/api"

const prompt = "A surreal landscape with a pink sky and strange shapes"

generateImage(prompt).then(response => {
  console.log(response)

})

```

The response will be:
```json
   {
     data: {
       data: [
         { url: "https://openai.com/image1.jpg" },
         { url: "https://openai.com/image2.jpg" },
         { url: "https://openai.com/image3.jpg" },
         { url: "https://openai.com/image4.jpg" },
         { url: "https://openai.com/image5.jpg" },
       ],
     },
   }
```

## Tags
These tags can be modified and removed at any point as tags are locally stored.

To add a tag, visit the `generate new image` page and enter a value that does not already exist. This will give you the option to add that value as a tag.

```typescript

  const defaultTags: Tag[] = [
    {
      id: uuidV4(),
      label: "Modern Art"
    },
    {
      id: uuidV4(),
      label: "Abstract Art"
    },
    {
      id: uuidV4(),
      label: "Digital Art"
    },
    {
      id: uuidV4(),
      label: "Pop Art"
    },
    {
      id: uuidV4(),
      label: "Surreal Art"
    }
  ]

```

## Tags
Tags are completely addable, removable and modifyable.
If a tag is added, a unique id is generated through the  
uuidv4() command.


```jsx
 <CreatableReactSelect
    onCreateOption={label => {
      const newTag = { id: uuidV4(), label }
      onAddTag(newTag)
      setSelectedTags(prev => [...prev, newTag])
    }}
    value={selectedTags.map(tag => {
      return { label: tag.label, value: tag.id }
    })}
    options={availableTags.map(tag => {
      return { label: tag.label, value: tag.id }
    })}
    onChange={tags => {
      setSelectedTags(
        tags.map(tag => {
          return { label: tag.label, id: tag.value }
        })
      )
    }}
    isMulti
  />
```
Tags stored locally
```json
[
    {
        "id": "a7217a6d-ae56-4d87-bd8a-1512d854f069",
        "label": "Modern Art"
    },
    {
        "id": "454a3cc2-faba-4725-9db7-a886cfe75005",
        "label": "Abstract Art"
    },
    {
        "id": "56ffc095-a956-4b1e-b912-a98072e21eab",
        "label": "Digital Art"
    },
    {
        "id": "75a65589-dc9b-49aa-bdd4-b197b3393283",
        "label": "Pop Art"
    },
    {
        "id": "6cbcae8c-a5ee-4f27-bcaf-ccc284ca9cee",
        "label": "Surreal Art"
    },
    ...
]
```
### Image Collection
```json
[
    {
        "body": "Ocean Waves",
        "images": [
            {
                "url": "...",
                "favorite": false
            },
            {
                "url": "...",
                "favorite": false
            },
            {
                "url": "...",
                "favorite": false
            },
            {
                "url": "...",
                "favorite": false
            },
            {
                "url": "...",
                "favorite": false
            }
        ],
        "id": "8d09e247-7d79-477b-871f-e4629a31754f",
        "tagIds": [
            "56ffc095-a956-4b1e-b912-a98072e21eab",
            "454a3cc2-faba-4725-9db7-a886cfe75005",
            ...
        ]
    },
    {
      "body": "Ocean Sand",
      "images":[
        ...
      ]
      "id": ...,
      "tagIds": [
        ...
      ]
    },
    ...
]
```