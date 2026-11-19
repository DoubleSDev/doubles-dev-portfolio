'use client';

import { useRef, useState } from 'react';
import { asset } from './asset-path';

type Model = {
  title: string;
  file: string;
  category: string;
  alt: string;
  zoom?: boolean;
};

const featured: Model = {
  title: 'Suoming',
  file: 'anime-mysterious.webp',
  category: 'Character Duo',
  alt: 'Two armored Roblox characters with lavender and crimson hair, an ornate blade, and a red umbrella.',
};

const models: Model[] = [
  { title: 'Guan Yu', file: 'guan-yu.png', category: 'Character & Weapon', alt: 'Front and back views of a green and gold armored Roblox character with a polearm.' },
  { title: 'Miyabi', file: 'miyabi.png', category: 'Character & Outfit', alt: 'Front and back views of a dark-haired Roblox character with fox ears and a teal outfit.' },
  { title: 'Castorise', file: 'castorise.png', category: 'Character & Outfit', alt: 'Two versions of a white-haired Roblox character in detailed white and purple dresses.' },
  { title: 'QingXaio R6', file: 'qingxaio.webp', category: 'Character & Weapons', alt: 'Front and back views of a blue-haired Roblox character with a layered outfit and floating swords.' },
  { title: 'Xaihi', file: 'astral-staff.webp', category: 'Character & Prop', alt: 'Teal-haired Roblox character in a dark pleated outfit holding a ring-topped staff.' },
  { title: 'Lavatain', file: 'crimson-blade.webp', category: 'Character & Weapon', alt: 'Red-haired Roblox character in black holding a curved orange blade.' },
  { title: 'Camille', file: 'camille.webp', category: 'Character & Weapon', alt: 'Front and back views of a teal-haired Roblox character in a pinstripe coat, with a red weapon between the two views.' },
  { title: 'YaniNeko', file: 'yanineko.webp', category: 'Head & Hair', alt: 'Front and back views of a mint-haired Roblox head with cat ears and amber eyes.', zoom: true },
  { title: 'Ecidna', file: 'silver-hair.webp', category: 'Hair & Accessory', alt: 'Front and back views of long silver hair with a green butterfly hair clip.' },
  { title: 'Void Dragon Armor', file: 'void-dragon.png', category: 'Fantasy Armor', alt: 'Front and back views of black and purple armor with dragon wings and crystal details.' },
  { title: 'Crimson Knight', file: 'crimson-knight.png', category: 'Character Armor', alt: 'Front and back views of crimson knight armor and a patterned cape.' },
  { title: 'Silver Knight', file: 'silver-knight.png', category: 'Armor & Weapon', alt: 'Front and back views of silver knight armor with a sword.' },
  { title: 'Crystal Fan', file: 'crystal-fan.png', category: 'Weapon & UV Layout', alt: 'Purple crystal fan with the model and its UV layout shown in Blender.' },
  { title: 'Halloween Throne', file: 'halloween-throne.png', category: 'Fantasy Prop', alt: 'Front and back views of a purple and gold throne decorated with pumpkins, cats, and a crown.' },
  { title: 'Saber', file: 'blue-character.png', category: 'Character & Outfit', alt: 'Front and back views of a stylized character in a blue outfit with gold detailing.' },
];

function ModelCard({ model, onOpen, feature = false }: {
  model: Model;
  onOpen: (model: Model) => void;
  feature?: boolean;
}) {
  return (
    <article className={feature ? 'modelCard featuredModel' : 'modelCard'}>
      <button className="modelButton" type="button" onClick={() => onOpen(model)} aria-label={`Enlarge ${model.title}`} aria-haspopup="dialog">
        <span className={model.zoom ? 'modelFrame zoomedFrame' : 'modelFrame'}>
          <img
            src={asset(`models/${model.file}`)}
            alt={model.alt}
            loading={feature ? 'eager' : 'lazy'}
            fetchPriority={feature ? 'high' : undefined}
            decoding="async"
          />
          <span className="modelExpand" aria-hidden="true">↗</span>
        </span>
      </button>
      <div className="modelCaption">
        <h2>{model.title}</h2>
        <span>{model.category}</span>
      </div>
    </article>
  );
}

export function ModelGallery() {
  const [activeModel, setActiveModel] = useState<Model | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  function openModel(model: Model) {
    setActiveModel(model);
    dialog.current?.showModal();
  }

  return (
    <>
      <ModelCard model={featured} onOpen={openModel} feature />
      <section className="modelGrid" aria-label="Model gallery">
        {models.map((model) => <ModelCard key={model.file} model={model} onOpen={openModel} />)}
      </section>
      <dialog className="portfolioDialog" ref={dialog} aria-labelledby="model-dialog-title" onClose={() => setActiveModel(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="dialogInner">
          <div className="dialogHeader">
            <h2 id="model-dialog-title">{activeModel?.title}</h2>
            <button className="dialogClose" type="button" onClick={() => dialog.current?.close()} aria-label="Close image">×</button>
          </div>
          {activeModel && <img className="dialogImage" src={asset(`models/${activeModel.file}`)} alt={activeModel.alt} />}
        </div>
      </dialog>
    </>
  );
}
