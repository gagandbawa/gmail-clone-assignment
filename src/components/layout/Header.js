import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 56px;
  padding: 8px;
`;

const LogoWrapper = styled.div`
  min-width: 250px;
  height: 48px;
  vertical-align: middle;
  white-space: nowrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-user-select: none;
`;

const MenuWrapper = styled.div`
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px;
  padding: 12px;
  overflow: hidden;
  vertical-align: middle;
  cursor: pointer;
  height: 24px;
  width: 24px;
  -webkit-user-select: none;
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
`
const GLogoWrapper = styled.div`
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
`
const InputWrapper = styled.div`
  height: 46px;
  width: 100%;
  max-width: 1072px;
  margin-left: 20px;
`;

const Header = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <MenuWrapper>
          <MenuIcon />
        </MenuWrapper>
        <GLogoWrapper>
          <img src='https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png' alt='' />
        </GLogoWrapper>
      </LogoWrapper>
      <InputWrapper>
        <TextField fullWidth variant="filled" id="fullWidth" 
          placeholder="Search mail"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </InputWrapper>
    </Wrapper>
  )
}

export default Header;