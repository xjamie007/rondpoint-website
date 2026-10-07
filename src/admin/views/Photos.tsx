import { useAdmin } from '../state';
import { Card, PhotoButtons } from '../ui';
import { resizeImage } from '../model';

export default function Photos() {
  const { data, draft, update, S } = useAdmin();
  return (
    <Card title={S.photos.title} intro={S.photos.intro}>
      <div className="a-photos">
        {data.photos.map((p) => {
          const target = `src/assets/photos/${p.key}.jpg`;
          const upload = draft.uploads[target];
          const removed = p.own && draft.deletes.includes(p.file);
          const src = upload?.dataUrl ?? (removed ? null : p.preview);
          const state = upload ? S.photos.newPhoto : p.own && !removed ? S.photos.own : p.preview && !removed ? S.photos.demoPhoto : S.photos.none;
          return (
            <figure className="a-photo" key={p.key}>
              <div className="a-photo-img">{src ? <img src={src} alt="" loading="lazy" /> : <span aria-hidden="true">📷</span>}</div>
              <figcaption>
                <strong>{S.photos.slots[p.key] ?? p.key}</strong>
                <span className={`a-tag${upload ? ' is-new' : ''}`}>{state}</span>
                <PhotoButtons
                  pick={S.photos.pick}
                  take={S.photos.take}
                  onFile={async (f) => {
                    const img = await resizeImage(f, 2400);
                    update((x) => {
                      x.uploads[target] = img;
                      // anderes Format desselben Platzes ersetzen
                      if (p.own && p.file !== target && !x.deletes.includes(p.file)) x.deletes.push(p.file);
                    });
                  }}
                />
                {(upload || (p.own && !removed)) && (
                  <button
                    type="button"
                    className="a-link"
                    onClick={() =>
                      update((x) => {
                        delete x.uploads[target];
                        if (p.own && !x.deletes.includes(p.file)) x.deletes.push(p.file);
                      })
                    }
                  >
                    {S.photos.reset}
                  </button>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Card>
  );
}
