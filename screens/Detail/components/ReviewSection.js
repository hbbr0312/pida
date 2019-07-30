import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Title } from "./Styled";

const Container = styled.View`
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Review = styled.View`
  margin-bottom: 10px;
`;
const Writer = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled.Text`
  margin-top: 7px;
  font-size: 16px;
  color: grey;
`;

const fakeData = [
  {
    id: 1,
    user: "hbbr",
    content: "너무 좋아요"
  },
  {
    id: 2,
    user: "asdf123",
    content:
      "우선 저는 극건성이구요, 발효성분을 제외한 웬만한 성분들은 잘 맞는 피부타입이에요.처음엔 무매력이 매력이다 하고 사용했던 제품인데 이 제품만큼 오래 쓰는 크림은 없더라구요 ㅎㅎ 예전에 4월?달 쯤에 이 제품을 여기 올리브영 온라인몰에서 첫 출시 한 때에 구매해서 그 한통으로 주구장창 쓰다가 지금은 두번째 통 사용중인데 이 제품은 봄이나 가을에 쓰기 좋은거 같아요. 거의 4계절 내내 써본 후기로서는 여름엔 좀 무거워서 땀 많이 흘리면 유분과 땀이 섞여서 얼굴이 굉장히 기름기름한 얼굴이 되는 느낌인데도 수분 보충 해줘도 이 제품만 쓰면 뭔가 수분이 금방 빠져나가서 속이 건조했던? 확실히 여름에 사용하긴 조금 아쉬웠던 점이 많았던 제품이에요. 제가 봤을 땐 이 제품이 유분감이 없는 편은 아닌데 속에 있는 수분을 잘 잡아주진 못 하는거 같더라구요. 그래도 바람 살랑살랑 부는 시원한 봄이나 가을은 산뜻한거 같아요. 지금같은 겨울은 확실히 얘 하나로는 좀 부족해서 저는 얘 바르고 난 후에 다른 묵직한 크림 하나 더 바르고 뽀송한 밤이랑 유분기 있는 밤을 바르고 마무리 해줍니다. 하지만 기초에서 얘를 빼기엔 뭔가 수분감이 아쉬울거 같은? 제가 느끼기엔 얘는 유분감보단 수분감이 더 많은거 같아요. 성분은 웬만한 민감성이나 이 제품에 있는 성분 중 하나에 민감하신 분이 아니시라면 무난하게 사용하실 수 있을거 같아요 :)"
  },
  {
    id: 3,
    user: "tmfrn0312",
    content:
      "딱 좋아요 제 피부에\n민감한 피부가 아니지만 겨울에 수분감이 덜한걸 쓰면 피부가 많이 뒤집어 지는데 이 제품을 쓰니 하루종일촉촉해요"
  },
  {
    id: 4,
    user: "kimbbr",
    content:
      "우선 정말 고민하다 구매한결과 세일할때 구매하여서 더 기분이 좋았고\n고민한만큼 사용감이 좋아서 더더더 좋았음.\n끈적임 싫어하는저에게는 정말정말 적당한 끈적임 정도였고\n양조절잘해서 바르면 지성.민감.여드름 인 저에게도 아무런 반응없이 무난하게 데일리로 잘 사용하고있음. 근데 향이 연고?같은 향이나서 좀 그렇긴한데\n쓰다보면 신경안쓰게됨. 고민하고있다면/수분크림 구매해야한다면 한번쯤 사봐라 말해주고싶습니다"
  }
];

const ReviewSection = ({ reviews }) => {
  return (
    <>
      <Title>리뷰</Title>
      <Container>
        {reviews.map(review => (
          <Review key={review.id}>
            <Writer>{review.user}</Writer>
            <Content>{review.content}</Content>
          </Review>
        ))}
      </Container>
    </>
  );
};

ReviewSection.propTypes = {
  reviews: PropTypes.array
};

export default ReviewSection;
