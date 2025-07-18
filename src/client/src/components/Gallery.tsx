import { Card, List } from "antd";
import { useAtom } from "jotai";
import { galleryAtom } from "#client/store/atoms.ts";

const { Meta } = Card;

function Gallery() {
  const [appGalleryAtom, setAppGalleryAtom] = useAtom(galleryAtom);
  return (
    <List
      grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 6, xl: 8, xxl: 10 }}
      dataSource={appGalleryAtom}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            // title={item.name}
            cover={
              <img
                alt="No Preview"
                src={item.modelVersions[0]?.images[0]?.url ?? null}
              />
            }
          >
            <Meta title={item.name}></Meta>
          </Card>
        </List.Item>
      )}
    >
    </List>
  );
}

export default Gallery;
