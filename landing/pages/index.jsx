import Page from '../components/Page'
import Banner from '../components/Banner'
import Info from '../components/Info'
import Block from '../components/Block'
import Promo from '../components/Promo'

export default () => (
  <Page>
    <Banner/>

    <Info>
      <Block
        img="undraw_bookmarks_r6u.png"
        title="Персональные подборки материалов"
        text="Используйте единую базу знаний, формируйте свою коллекцию статей, книг, видео, курсов, фреймворков и инструментов в разрезе тех навыков, которые нужны для вашей специальности."
      />

      <Block
        theme="reverse"
        img="undraw_buffer_wq43.png"
        title="Обмен знаниями"
        text="Следите за новыми матриалами, от людей, которые уже развили такие же навыки или еще развивают и от людей такой же специальности. Делитесь материалами с коллегами и друзьями."
      />

      <Block
        img="undraw_accept_reques.png"
        title="Персональный план развития"
        text="Создавайте пошаговый план обучения на основе коллекций материалов для достижения целей и следите за прогрессом."
      />
    </Info>

    <Promo/>
  </Page>
)